import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'profile', 'manifest.json'), 'utf8'));

test('manifest has unique pinned components with allowed licenses', () => {
  const names = new Set();
  for (const component of manifest.components) {
    assert.equal(names.has(component.package), false, `duplicate ${component.package}`);
    names.add(component.package);
    assert.ok(manifest.allowedLicenses.includes(component.license));
    assert.match(component.commit, /^[0-9a-f]{40}$/);
    assert.match(component.repository, /^https:\/\/github\.com\/[^/]+\/[^/]+(?:\.git)?$/);
  }
});

test('default components have no optional-only marker', () => {
  assert.ok(manifest.components.every((component) => !component.default || !component.optional));
  assert.ok(manifest.components.some((component) => component.default));
});
