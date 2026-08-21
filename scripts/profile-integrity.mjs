import fs from 'node:fs';
import path from 'node:path';

const CORE_PREFIX = '@deepseek-ai/dsh-';
const CORE_EXACT = new Set(['@deepseek-ai/dsh', '@deepseek-ai/cordis']);

export function isHostCorePackage(name) {
  return typeof name === 'string' && (CORE_EXACT.has(name) || name.startsWith(CORE_PREFIX));
}

export function normalizePlatform(platform = process.platform) {
  if (platform === 'darwin') return 'macos';
  if (platform === 'win32') return 'windows';
  return platform;
}

export function selectComponents(manifest, { includeOptional = false, requested = new Set(), platform = process.platform } = {}) {
  const target = normalizePlatform(platform);
  const byPackage = new Map(manifest.components.map(component => [component.package, component]));
  for (const packageName of requested) {
    const component = byPackage.get(packageName);
    if (!component) throw new Error(`Unknown component requested: ${packageName}`);
    if (component.platform && component.platform !== target) {
      throw new Error(`${packageName} supports ${component.platform}, not ${target}`);
    }
  }
  return manifest.components.filter(component => {
    if (component.platform && component.platform !== target) return false;
    return component.default || (includeOptional && component.optional) || requested.has(component.package);
  });
}

function packageNameFromLockLocation(location, entry) {
  if (entry.name) return entry.name;
  const marker = 'node_modules/';
  const index = location.lastIndexOf(marker);
  return index >= 0 ? location.slice(index + marker.length) : location || '<profile>';
}

export function auditLockfile(lockfile) {
  const violations = [];
  for (const [location, entry] of Object.entries(lockfile.packages ?? {})) {
    if (!entry || location === '') continue;
    const owner = packageNameFromLockLocation(location, entry);
    for (const [dependency, range] of Object.entries(entry.dependencies ?? {})) {
      if (isHostCorePackage(dependency)) violations.push({ owner, ownerLocation: location, dependency, range });
    }
  }
  return violations;
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function scanPackage(directory, packages, visited) {
  let resolved;
  try {
    resolved = fs.realpathSync(directory);
  } catch {
    return;
  }
  if (visited.has(resolved)) return;
  visited.add(resolved);
  const manifest = readJson(path.join(directory, 'package.json'));
  if (manifest?.name) {
    packages.push({
      name: manifest.name,
      version: manifest.version ?? 'unknown',
      path: resolved,
      dependencies: manifest.dependencies ?? {},
    });
  }
  scanNodeModules(path.join(directory, 'node_modules'), packages, visited);
}

function scanNodeModules(nodeModules, packages = [], visited = new Set()) {
  let entries = [];
  try {
    entries = fs.readdirSync(nodeModules, { withFileTypes: true });
  } catch {
    return packages;
  }
  for (const entry of entries) {
    if (entry.name === '.bin') continue;
    const entryPath = path.join(nodeModules, entry.name);
    if (entry.name === '.pnpm') {
      let storeEntries = [];
      try {
        storeEntries = fs.readdirSync(entryPath, { withFileTypes: true });
      } catch {}
      for (const storeEntry of storeEntries) {
        if (storeEntry.isDirectory() || storeEntry.isSymbolicLink()) {
          scanNodeModules(path.join(entryPath, storeEntry.name, 'node_modules'), packages, visited);
        }
      }
    } else if (entry.name.startsWith('@')) {
      let scopedEntries = [];
      try {
        scopedEntries = fs.readdirSync(entryPath, { withFileTypes: true });
      } catch {}
      for (const scopedEntry of scopedEntries) {
        if (scopedEntry.isDirectory() || scopedEntry.isSymbolicLink()) {
          scanPackage(path.join(entryPath, scopedEntry.name), packages, visited);
        }
      }
    } else if (entry.isDirectory() || entry.isSymbolicLink()) {
      scanPackage(entryPath, packages, visited);
    }
  }
  return packages;
}

export function auditInstalledProfile(profileDir, { runtimeDir = '' } = {}) {
  const profile = path.resolve(profileDir);
  const packages = scanNodeModules(path.join(profile, 'node_modules'));
  const directEntrypointFailures = [];
  const profileManifest = readJson(path.join(profile, 'package.json'));
  for (const packageName of Object.keys(profileManifest?.dependencies ?? {})) {
    const packageDirectory = path.join(profile, 'node_modules', ...packageName.split('/'));
    const packageManifest = readJson(path.join(packageDirectory, 'package.json'));
    if (!packageManifest) {
      directEntrypointFailures.push({ package: packageName, entry: 'package.json' });
      continue;
    }
    for (const entry of [packageManifest.main, packageManifest.dsh?.bundle?.patch].filter(Boolean)) {
      if (!fs.existsSync(path.join(packageDirectory, entry))) {
        directEntrypointFailures.push({ package: packageName, entry });
      }
    }
  }
  const dependencyViolations = [];
  for (const pkg of packages) {
    for (const [dependency, range] of Object.entries(pkg.dependencies)) {
      if (isHostCorePackage(dependency)) {
        dependencyViolations.push({ owner: pkg.name, ownerPath: pkg.path, dependency, range });
      }
    }
  }

  const duplicateCorePackages = [];
  if (runtimeDir) {
    const runtimeManifest = path.join(path.resolve(runtimeDir), 'node_modules', '@deepseek-ai', 'dsh', 'package.json');
    if (!fs.existsSync(runtimeManifest)) throw new Error(`Cannot find the DSH runtime at ${runtimeManifest}`);
    const hostPackages = scanNodeModules(path.join(path.resolve(runtimeDir), 'node_modules'))
      .filter(pkg => isHostCorePackage(pkg.name));
    const hostByName = new Map(hostPackages.map(pkg => [pkg.name, pkg]));
    for (const pkg of packages) {
      const host = hostByName.get(pkg.name);
      if (host && host.path !== pkg.path) {
        duplicateCorePackages.push({
          package: pkg.name,
          hostVersion: host.version,
          profileVersion: pkg.version,
          hostPath: host.path,
          profilePath: pkg.path,
        });
      }
    }
  }

  return {
    ok: dependencyViolations.length === 0 && duplicateCorePackages.length === 0 && directEntrypointFailures.length === 0,
    profileDir: profile,
    dependencyViolations,
    duplicateCorePackages,
    directEntrypointFailures,
  };
}

export function formatIntegrityFailures(report) {
  const lines = [];
  for (const violation of report.dependencyViolations ?? report) {
    lines.push(`${violation.owner} declares host core ${violation.dependency} (${violation.range}) in dependencies`);
  }
  for (const duplicate of report.duplicateCorePackages ?? []) {
    lines.push(`${duplicate.package} has separate host/profile copies: ${duplicate.hostPath} <> ${duplicate.profilePath}`);
  }
  for (const missing of report.directEntrypointFailures ?? []) {
    lines.push(`${missing.package} is missing installed entry ${missing.entry}`);
  }
  return lines;
}
