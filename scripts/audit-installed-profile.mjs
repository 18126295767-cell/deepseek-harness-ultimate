#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { auditInstalledProfile, formatIntegrityFailures } from './profile-integrity.mjs';

const args = process.argv.slice(2);
const homeDirectory = process.env.HOME || process.env.USERPROFILE || os.homedir();
let profileDir = path.join(homeDirectory, '.dsh', 'profiles', 'web');
let runtimeDir = '';
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--profile-dir') profileDir = path.resolve(args[++i] || '');
  else if (args[i] === '--runtime-dir') runtimeDir = path.resolve(args[++i] || '');
  else if (args[i] === '--help' || args[i] === '-h') {
    console.log('Usage: node scripts/audit-installed-profile.mjs [--profile-dir PATH] [--runtime-dir PATH]');
    process.exit(0);
  } else throw new Error(`Unknown argument: ${args[i]}`);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'profile', 'manifest.json'), 'utf8'));
const eligible = new Map(manifest.components.map((component) => [component.package, component]));
const support = new Set(manifest.components.flatMap((component) => component.distribution?.supportDependencies ?? []).map((dependency) => dependency.package));
const pkg = JSON.parse(fs.readFileSync(path.join(profileDir, 'package.json'), 'utf8'));
const installed = Object.keys(pkg.dependencies || {}).sort();
const included = installed.filter((name) => eligible.has(name));
const installedSupport = installed.filter((name) => support.has(name));
const excluded = installed.filter((name) => !eligible.has(name) && !support.has(name));
console.log(`Profile: ${profileDir}`);
console.log(`Installed direct packages: ${installed.length}`);
console.log(`Eligible Ultimate components: ${included.length}`);
console.log(`Pinned support dependencies: ${installedSupport.length}`);
console.log(`Not included in Ultimate manifest: ${excluded.length}`);
for (const name of excluded) console.log(`- ${name}`);
const integrity = auditInstalledProfile(profileDir, { runtimeDir });
if (!integrity.ok) {
  console.error('Profile integrity audit failed:');
  for (const line of formatIntegrityFailures(integrity)) console.error(`- ${line}`);
  process.exit(2);
}
console.log('Profile dependency integrity: OK');
