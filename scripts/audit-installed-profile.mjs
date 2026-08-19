#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
let profileDir = path.join(process.env.HOME || '', '.dsh', 'profiles', 'web');
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--profile-dir') profileDir = path.resolve(args[++i] || '');
  else if (args[i] === '--help' || args[i] === '-h') {
    console.log('Usage: node scripts/audit-installed-profile.mjs [--profile-dir PATH]');
    process.exit(0);
  } else throw new Error(`Unknown argument: ${args[i]}`);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'profile', 'manifest.json'), 'utf8'));
const eligible = new Map(manifest.components.map((component) => [component.package, component]));
const pkg = JSON.parse(fs.readFileSync(path.join(profileDir, 'package.json'), 'utf8'));
const installed = Object.keys(pkg.dependencies || {}).sort();
const included = installed.filter((name) => eligible.has(name));
const excluded = installed.filter((name) => !eligible.has(name));
console.log(`Profile: ${profileDir}`);
console.log(`Installed direct packages: ${installed.length}`);
console.log(`Eligible in Ultimate manifest: ${included.length}`);
console.log(`Not included in Ultimate manifest: ${excluded.length}`);
for (const name of excluded) console.log(`- ${name}`);
