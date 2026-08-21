#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { auditInstalledProfile, auditLockfile, formatIntegrityFailures, normalizePlatform, selectComponents } from './profile-integrity.mjs';
import { npmInvocation } from './platform-command.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'profile', 'manifest.json'), 'utf8'));
const args = process.argv.slice(2);
let profileDir = path.join(os.homedir(), '.dsh', 'profiles', 'ultimate');
let includeOptional = false;
let dryRun = false;
let runtimeDir = '';
let targetPlatform = normalizePlatform();
const requested = new Set();
const npm = npmInvocation();
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--profile-dir') profileDir = path.resolve(args[++i] || '');
  else if (args[i] === '--include-optional') includeOptional = true;
  else if (args[i] === '--dry-run') dryRun = true;
  else if (args[i] === '--runtime-dir') runtimeDir = path.resolve(args[++i] || '');
  else if (args[i] === '--platform') targetPlatform = normalizePlatform(args[++i] || '');
  else if (args[i] === '--include') requested.add(args[++i] || '');
  else if (args[i] === '--help' || args[i] === '-h') {
    console.log('Usage: node scripts/install-ultimate.mjs [--profile-dir PATH] [--runtime-dir PATH] [--platform macos|windows|linux] [--include-optional] [--include PACKAGE] [--dry-run]');
    process.exit(0);
  } else throw new Error(`Unknown argument: ${args[i]}`);
}
if (!['macos', 'windows', 'linux'].includes(targetPlatform)) throw new Error(`Unsupported platform: ${targetPlatform}`);

function executable(name) {
  return process.platform === 'win32' ? `${name}.cmd` : name;
}

function run(command, commandArgs, cwd, label) {
  const result = spawnSync(command, commandArgs, { cwd, stdio: 'inherit' });
  if (result.status !== 0) {
    const detail = result.error ? `: ${result.error.message}` : '';
    throw new Error(`${label} failed with exit code ${result.status ?? 1}${detail}`);
  }
}

async function download(url, destination) {
  const attempts = 4;
  let failure;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(120_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
      return;
    } catch (error) {
      failure = error;
      fs.rmSync(destination, { force: true });
      if (attempt < attempts) {
        const delayMs = 1_000 * (2 ** (attempt - 1));
        console.warn(`Download attempt ${attempt}/${attempts} failed for ${url}; retrying in ${delayMs / 1_000}s.`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw new Error(`Download failed after ${attempts} attempts for ${url}: ${failure?.message || 'unknown error'}`);
}

function archiveUrl(component) {
  const repoPath = component.repository.replace('https://github.com/', '').replace(/\.git$/, '');
  return `https://codeload.github.com/${repoPath}/tar.gz/${component.commit}`;
}

function artifactName(component) {
  return `${component.package.replace(/^@/, '').replace(/[^a-zA-Z0-9._-]+/g, '-')}-${component.version}.tgz`;
}

async function buildSourcePackage(component, outputDirectory) {
  const buildRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-ultimate-build-'));
  try {
    const archive = path.join(buildRoot, 'source.tar.gz');
    const source = path.join(buildRoot, 'source');
    fs.mkdirSync(source);
    await download(archiveUrl(component), archive);
    run('tar', ['-xzf', archive, '-C', source, '--strip-components=1'], buildRoot, `${component.package} source extraction`);

    const recipe = component.distribution;
    if (recipe.packageManager.startsWith('pnpm@')) {
      const version = recipe.packageManager.slice('pnpm@'.length);
      const pnpm = ['--yes', `pnpm@${version}`];
      run(executable('npx'), [...pnpm, 'install', '--frozen-lockfile', '--ignore-scripts'], source, `${component.package} dependency install`);
      run(executable('npx'), [...pnpm, 'run', 'build'], source, `${component.package} build`);
      run(npm.command, [...npm.argsPrefix, 'pack', '--pack-destination', outputDirectory, '--ignore-scripts'], source, `${component.package} pack`);
    } else if (recipe.packageManager === 'npm') {
      run(npm.command, [...npm.argsPrefix, 'install', '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund'], source, `${component.package} dependency install`);
      if (recipe.buildDependencies?.length) {
        run(npm.command, [...npm.argsPrefix, 'install', '--no-save', '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund', ...recipe.buildDependencies], source, `${component.package} build dependency install`);
      }
      run(npm.command, [...npm.argsPrefix, 'run', 'build'], source, `${component.package} build`);
      run(npm.command, [...npm.argsPrefix, 'pack', '--pack-destination', outputDirectory, '--ignore-scripts'], source, `${component.package} pack`);
    } else {
      throw new Error(`${component.package}: unsupported source-build package manager ${recipe.packageManager}`);
    }

    const packed = fs.readdirSync(outputDirectory)
      .filter((file) => file.endsWith('.tgz'))
      .map((file) => path.join(outputDirectory, file))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
    if (!packed) throw new Error(`${component.package}: build produced no package tarball`);
    const target = path.join(outputDirectory, artifactName(component));
    if (packed !== target) fs.renameSync(packed, target);
    return target;
  } finally {
    fs.rmSync(buildRoot, { recursive: true, force: true });
  }
}

const audit = spawnSync(process.execPath, [path.join(root, 'scripts', 'audit-manifest.mjs')], { encoding: 'utf8' });
if (audit.status !== 0) { process.stderr.write(audit.stderr || audit.stdout); process.exit(audit.status || 1); }

const selected = selectComponents(manifest, { includeOptional, requested, platform: targetPlatform });
if (!selected.length) throw new Error('No components selected');
const hostBundles = ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'];
if (dryRun) {
  console.log(JSON.stringify({ profileDir, platform: targetPlatform, selected: selected.map((component) => ({ package: component.package, repository: component.repository, commit: component.commit })) }, null, 2));
  process.exit(0);
}
const artifactDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-ultimate-artifacts-'));
const builtArtifacts = new Map();
try {
  for (const component of selected.filter((item) => item.distribution?.type === 'source-build')) {
    builtArtifacts.set(component.package, await buildSourcePackage(component, artifactDirectory));
  }
  const supportDependencies = selected.flatMap((component) => component.distribution?.supportDependencies ?? []);
  const packageJson = {
    name: 'dsh-profile-ultimate',
    version: '1.0.0',
    private: true,
    description: 'Generated by DeepSeek Harness Ultimate; upstream packages retain their own licenses.',
    dependencies: Object.fromEntries([
      ...selected.map((component) => {
        if (component.distribution?.type === 'npm') return [component.package, component.version];
        if (component.distribution?.type === 'source-build') return [component.package, `file:.ultimate-packages/${artifactName(component)}`];
        return [component.package, archiveUrl(component)];
      }),
      ...supportDependencies.map((dependency) => [dependency.package, dependency.version]),
    ]),
    dsh: { profile: { bundles: [...hostBundles, ...selected.map((component) => component.package)] } },
    ultimate: { manifest: 'https://github.com/18126295767-cell/deepseek-harness-ultimate/blob/main/profile/manifest.json' }
  };
  const preflightDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-ultimate-preflight-'));
  let lockfile;
  try {
    const preflightArtifacts = path.join(preflightDir, '.ultimate-packages');
    fs.mkdirSync(preflightArtifacts);
    for (const artifact of builtArtifacts.values()) fs.copyFileSync(artifact, path.join(preflightArtifacts, path.basename(artifact)));
    fs.writeFileSync(path.join(preflightDir, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`);
    const preflight = spawnSync(npm.command, [...npm.argsPrefix, 'install', '--package-lock-only', '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund'], { cwd: preflightDir, stdio: 'inherit' });
    if (preflight.status !== 0) {
      const detail = preflight.error ? `: ${preflight.error.message}` : '';
      throw new Error(`Dependency preflight failed with exit code ${preflight.status ?? 1}${detail}`);
    }
    lockfile = JSON.parse(fs.readFileSync(path.join(preflightDir, 'package-lock.json'), 'utf8'));
    const pinnedRegistryPackages = [
      ...selected.filter((item) => item.distribution?.type === 'npm').map((component) => ({ package: component.package, integrity: component.distribution.integrity })),
      ...supportDependencies,
    ];
    for (const registryPackage of pinnedRegistryPackages) {
      const location = `node_modules/${registryPackage.package}`;
      const integrity = lockfile.packages?.[location]?.integrity;
      if (integrity !== registryPackage.integrity) {
        throw new Error(`${registryPackage.package}: registry integrity ${integrity || '<missing>'} does not match the pinned manifest`);
      }
    }
    const violations = auditLockfile(lockfile);
    if (violations.length) {
      console.error('Dependency audit failed before profile installation:');
      for (const line of formatIntegrityFailures(violations)) console.error(`- ${line}`);
      console.error('DSH host core packages must be declared in peerDependencies, never dependencies.');
      throw new Error('Dependency preflight rejected the selected profile');
    }
  } finally {
    fs.rmSync(preflightDir, { recursive: true, force: true });
  }

  fs.mkdirSync(profileDir, { recursive: true });
  const profileArtifacts = path.join(profileDir, '.ultimate-packages');
  fs.rmSync(profileArtifacts, { recursive: true, force: true });
  fs.mkdirSync(profileArtifacts);
  for (const artifact of builtArtifacts.values()) fs.copyFileSync(artifact, path.join(profileArtifacts, path.basename(artifact)));
  fs.writeFileSync(path.join(profileDir, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`);
  fs.writeFileSync(path.join(profileDir, 'COMPONENTS.json'), `${JSON.stringify(selected, null, 2)}\n`);
  fs.writeFileSync(path.join(profileDir, 'package-lock.json'), `${JSON.stringify(lockfile, null, 2)}\n`);
  const patchPath = path.join(profileDir, 'cordis.patch.yml');
  if (!fs.existsSync(patchPath)) {
    fs.writeFileSync(patchPath, '# User overrides are applied after the Ultimate bundle layers.\n[]\n');
  }

  run(npm.command, [...npm.argsPrefix, 'install', '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund'], profileDir, 'Profile dependency installation');
  const installedAudit = auditInstalledProfile(profileDir, { runtimeDir });
  if (!installedAudit.ok) {
    console.error('Installed profile integrity audit failed:');
    for (const line of formatIntegrityFailures(installedAudit)) console.error(`- ${line}`);
    console.error('The profile was not approved for use. No credentials or sessions were changed.');
    throw new Error('Installed profile audit failed');
  }
  console.log(`Installed ${selected.length} selected components into ${profileDir}`);
  console.log(`Platform filter: ${targetPlatform}`);
  console.log('Profile entry point: npx --yes @deepseek-ai/dsh@0.1.0-rc.7 --profile ultimate');
  console.log('Credentials and provider settings were not created or copied. Configure them in your local DSH runtime.');
} finally {
  fs.rmSync(artifactDirectory, { recursive: true, force: true });
}
