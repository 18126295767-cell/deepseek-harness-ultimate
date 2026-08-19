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

test('Windows package is present and documented', () => {
  for (const file of [
    'windows/bootstrap-build-environment.ps1',
    'windows/install-ultimate.ps1',
    'windows/install-ultimate.cmd',
    'windows/build-release.ps1',
    'windows/installer.nsi',
    'windows/README.md',
    'windows/README.zh-CN.md',
    '.github/workflows/windows-release.yml'
  ]) {
    assert.equal(fs.existsSync(path.join(root, file)), true, `missing ${file}`);
  }
  const english = fs.readFileSync(path.join(root, 'TUTORIAL.md'), 'utf8');
  const chinese = fs.readFileSync(path.join(root, 'TUTORIAL.zh-CN.md'), 'utf8');
  assert.match(english, /windows(?:\\|\/)install-ultimate\.ps1/);
  assert.match(chinese, /windows\\install-ultimate\.ps1/);
  const guideCount = fs.readdirSync(path.join(root, 'windows'))
    .filter((file) => /^README.*\.md$/.test(file)).length;
  assert.equal(guideCount, 12, 'expected 12 Windows language guides');
});
