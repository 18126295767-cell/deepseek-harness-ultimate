#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const manifestPath = path.join(root, 'profile', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const allowed = new Set(manifest.allowedLicenses);
const errors = [];
const seen = new Set();

if (manifest.profile !== 'ultimate-curated') errors.push('profile must be ultimate-curated');
if (!Array.isArray(manifest.components) || manifest.components.length === 0) errors.push('components must be non-empty');

for (const component of manifest.components) {
  for (const field of ['name', 'package', 'version', 'license', 'repository', 'commit', 'category']) {
    if (!component[field]) errors.push(`${component.name || '<unknown>'}: missing ${field}`);
  }
  if (seen.has(component.package)) errors.push(`${component.package}: duplicate package name`);
  seen.add(component.package);
  if (!allowed.has(component.license)) errors.push(`${component.package}: license ${component.license} is not allowed`);
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+(?:\.git)?$/.test(component.repository)) errors.push(`${component.package}: repository must be a direct HTTPS GitHub URL`);
  if (!/^[0-9a-f]{40}$/.test(component.commit)) errors.push(`${component.package}: commit must be a 40-character lowercase SHA`);
  if (component.default && component.optional) errors.push(`${component.package}: cannot be both default and optional`);
  if (component.platform && !['macos', 'windows', 'linux'].includes(component.platform)) errors.push(`${component.package}: unsupported platform ${component.platform}`);
  if (component.distribution) {
    if (!['npm', 'source-build'].includes(component.distribution.type)) errors.push(`${component.package}: unsupported distribution type`);
    if (component.distribution.type === 'npm' && !/^sha512-[A-Za-z0-9+/]+={0,2}$/.test(component.distribution.integrity || '')) errors.push(`${component.package}: npm distribution needs sha512 integrity`);
    if (component.distribution.type === 'source-build' && !/^(?:npm|pnpm@\d+\.\d+\.\d+)$/.test(component.distribution.packageManager || '')) errors.push(`${component.package}: source-build needs a pinned package manager`);
    for (const dependency of component.distribution.supportDependencies ?? []) {
      if (!dependency.package || !/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(dependency.version || '')) errors.push(`${component.package}: support dependency needs an exact package and version`);
      if (!/^sha512-[A-Za-z0-9+/]+={0,2}$/.test(dependency.integrity || '')) errors.push(`${component.package}: support dependency ${dependency.package || '<unknown>'} needs sha512 integrity`);
      if (!allowed.has(dependency.license)) errors.push(`${component.package}: support dependency ${dependency.package || '<unknown>'} license ${dependency.license} is not allowed`);
    }
  }
}

if (errors.length) {
  console.error('Manifest audit failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Manifest OK: ${manifest.components.length} components; ${manifest.components.filter((x) => x.default).length} default, ${manifest.components.filter((x) => x.optional).length} optional.`);
console.log(`Allowed licenses: ${manifest.allowedLicenses.join(', ')}`);
