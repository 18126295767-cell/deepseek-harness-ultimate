import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const locales = ['en', 'zh-CN', 'zh-TW', 'es', 'fr', 'de', 'pt-BR', 'ru', 'ja', 'ko', 'ar', 'hi', 'it', 'id', 'tr', 'vi', 'th', 'pl', 'nl', 'uk'];
const fileFor = (kind, locale) => locale === 'en' ? `${kind}.md` : `${kind}.${locale}.md`;
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('README and tutorial exist for every documented language', () => {
  for (const locale of locales) {
    assert.equal(fs.existsSync(path.join(root, fileFor('README', locale))), true, `missing README for ${locale}`);
    assert.equal(fs.existsSync(path.join(root, fileFor('TUTORIAL', locale))), true, `missing tutorial for ${locale}`);
  }
});

test('each language selector points to every other local document', () => {
  for (const locale of locales) {
    for (const target of locales.filter(item => item !== locale)) {
      assert.match(read(fileFor('README', locale)), new RegExp(`\\]\\(${escapeRegExp(fileFor('README', target))}\\)`), `${locale} README misses ${target}`);
      assert.match(read(fileFor('TUTORIAL', locale)), new RegExp(`\\]\\(${escapeRegExp(fileFor('TUTORIAL', target))}\\)`), `${locale} tutorial misses ${target}`);
    }
  }
});

test('every translated tutorial retains executable beginner-path commands and safety boundaries', () => {
  for (const locale of locales) {
    const tutorial = read(fileFor('TUTORIAL', locale));
    assert.match(tutorial, /node --version/, `${locale} lacks Node.js check`);
    assert.match(tutorial, /scripts\/install-ultimate\.mjs/, `${locale} lacks profile install command`);
    assert.match(tutorial, /windows\\install-ultimate\.ps1/, `${locale} lacks Windows install command`);
    assert.match(tutorial, /@deepseek-ai\/dsh@0\.1\.0-rc\.7 --profile ultimate/, `${locale} lacks DSH start command`);
    assert.match(tutorial, /Settings → Models/, `${locale} lacks model configuration step`);
    assert.match(tutorial, /Profile dependency integrity: OK/, `${locale} lacks audit success marker`);
    assert.match(tutorial, /API|key|Key|密钥|密鑰|clave|clé|Schlüssel|chave|ключ|キー|키|مفتاح|कुंजी|chiave|kunci|anahtar|khóa|คีย์|klucz|sleutel/, `${locale} lacks credential safety guidance`);
  }
});

test('every README explains curation and links its matching tutorial', () => {
  for (const locale of locales) {
    const readme = read(fileFor('README', locale));
    assert.match(readme, /Ultimate/, `${locale} README lacks product name`);
    assert.match(readme, /plugin|Plugin|插件|外掛|plugi|プラグイン|플러그인|إضاف|प्लग|ปลั๊ก|wtycz|плагин|плагін|eklenti/i, `${locale} README lacks plugin context`);
    assert.match(readme, new RegExp(`\\]\\(${escapeRegExp(fileFor('TUTORIAL', locale))}\\)`), `${locale} README misses its tutorial`);
  }
});

test('non-English documents contain no untranslated generator boilerplate', () => {
  const forbidden = [
    'Why Ultimate exists',
    'One reviewed default for each overlapping role',
    'Open Settings → Models after the first launch',
    'Nearly every practical category” does not mean',
    'TaskSwarm already covers dependency waves',
    'The repository code is MIT-licensed',
    'A result beginning with `v22`',
    'Successful installation includes',
    'Expected final line:',
    'Developer verification',
    'The installer and manifest are MIT-licensed',
    'Back to README',
    'Tutorial languages:',
    '**Languages:**',
  ];
  for (const locale of locales.filter(item => !['en', 'zh-CN'].includes(item))) {
    for (const file of [fileFor('README', locale), fileFor('TUTORIAL', locale)]) {
      const source = read(file);
      for (const phrase of forbidden) assert.equal(source.includes(phrase), false, `${file} contains untranslated text: ${phrase}`);
    }
  }
});

test('the localizer source can be parsed and remains included in the package', () => {
  const source = read('scripts/generate-localized-docs.mjs');
  assert.match(source, /const allLanguages/);
  assert.match(source, /const locales/);
  assert.match(source, /function makeReadme/);
  assert.match(source, /function makeTutorial/);
  const packageJson = JSON.parse(read('package.json'));
  assert.ok(packageJson.files.includes('README*.md'));
  assert.ok(packageJson.files.includes('TUTORIAL*.md'));
});

test('all relative Markdown links resolve to repository files', () => {
  for (const locale of locales) {
    for (const file of [fileFor('README', locale), fileFor('TUTORIAL', locale)]) {
      const source = read(file);
      for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
        const href = match[1].split('#')[0];
        if (!href || /^(?:https?:|mailto:)/.test(href)) continue;
        assert.equal(fs.existsSync(path.resolve(root, path.dirname(file), href)), true, `${file} has broken link ${href}`);
      }
    }
  }
});
