import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { auditInstalledProfile, auditLockfile, selectComponents } from '../scripts/profile-integrity.mjs';
import { npmInvocation } from '../scripts/platform-command.mjs';

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

test('Windows selection excludes macOS-only components', () => {
  const selected = selectComponents(manifest, { platform: 'windows' });
  assert.equal(selected.some(component => component.package === 'keyringseam'), false);
  assert.throws(
    () => selectComponents(manifest, { platform: 'windows', requested: new Set(['keyringseam']) }),
    /supports macos, not windows/,
  );
});

test('npm subprocess uses the Windows command interpreter', () => {
  assert.deepEqual(npmInvocation('win32', { ComSpec: 'C:\\Windows\\System32\\cmd.exe' }), {
    command: 'C:\\Windows\\System32\\cmd.exe',
    argsPrefix: ['/d', '/s', '/c', 'npm'],
  });
  assert.deepEqual(npmInvocation('win32', {}), {
    command: 'cmd.exe',
    argsPrefix: ['/d', '/s', '/c', 'npm'],
  });
  assert.deepEqual(npmInvocation('darwin'), { command: 'npm', argsPrefix: [] });
  assert.deepEqual(npmInvocation('linux'), { command: 'npm', argsPrefix: [] });
});

test('lockfile audit rejects ordinary host-core dependencies but permits peers', () => {
  const violations = auditLockfile({
    packages: {
      '': {},
      'node_modules/broken': { name: 'broken', dependencies: { '@deepseek-ai/dsh-tools': '0.1.0-rc.7' } },
      'node_modules/safe': { name: 'safe', peerDependencies: { '@deepseek-ai/dsh-tools': '>=0.1.0-rc.6 <0.2.0' } },
    },
  });
  assert.deepEqual(violations.map(item => item.owner), ['broken']);
});

test('installed profile audit rejects a physical host-core copy', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-ultimate-integrity-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const profile = path.join(root, 'profile');
  const packageDir = path.join(profile, 'node_modules', '@deepseek-ai', 'dsh-tools');
  fs.mkdirSync(packageDir, { recursive: true });
  fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify({ name: '@deepseek-ai/dsh-tools', version: '0.1.0-rc.7' }));
  const pluginDir = path.join(profile, 'node_modules', 'broken-plugin');
  fs.mkdirSync(pluginDir, { recursive: true });
  fs.writeFileSync(path.join(pluginDir, 'package.json'), JSON.stringify({ name: 'broken-plugin', version: '1.0.0', dependencies: { '@deepseek-ai/dsh-tools': '0.1.0-rc.7' } }));

  const report = auditInstalledProfile(profile);
  assert.equal(report.ok, false);
  assert.equal(report.dependencyViolations[0].owner, 'broken-plugin');
});
