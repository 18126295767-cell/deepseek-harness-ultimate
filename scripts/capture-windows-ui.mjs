import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const baseUrl = args.get('--url') ?? 'http://127.0.0.1:3080/';
const outputDirectory = path.resolve(args.get('--output') ?? 'windows-screenshots');
const viewport = { width: 1600, height: 1000 };

await fs.mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport,
  deviceScaleFactor: 1,
  locale: 'en-US',
  colorScheme: 'light',
  reducedMotion: 'reduce',
});
const page = await context.newPage();

async function settle() {
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(500);
}

async function capture(name) {
  await settle();
  const file = path.join(outputDirectory, name);
  await page.screenshot({ path: file, animations: 'disabled' });
  return file;
}

async function clickButton(name, description) {
  const button = page.getByRole('button', { name }).filter({ visible: true }).first();
  await button.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {
    throw new Error(`Could not find the ${description} button.`);
  });
  await button.click();
  await settle();
}

const files = [];
try {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForFunction(() => Boolean(globalThis.__DSH_BOOT__), null, { timeout: 30_000 });

  files.push(await capture('windows-01-developer-preview.png'));
  await clickButton(/^(continue|继续)$/i, 'developer preview Continue');

  files.push(await capture('windows-02-api-key-onboarding.png'));
  await clickButton(/^(configure later|later|稍后配置)$/i, 'API onboarding Configure later');

  files.push(await capture('windows-03-empty-workspace.png'));
  await clickButton(/settings|设置/i, 'Settings');
  await clickButton(/^(models?|模型)$/i, 'Models');
  files.push(await capture('windows-04-model-settings.png'));

  await clickButton(/^(plugins?|插件)$/i, 'Plugins');
  const inventoryTab = page.getByRole('tab', { name: /plugin list|插件列表/i }).first();
  await inventoryTab.waitFor({ state: 'visible', timeout: 15_000 });
  await inventoryTab.click();
  files.push(await capture('windows-05-plugin-inventory.png'));

  const screenshots = [];
  for (const file of files) {
    const bytes = await fs.readFile(file);
    screenshots.push({
      file: path.basename(file),
      bytes: bytes.length,
      sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    });
  }

  const metadata = {
    capturedAt: new Date().toISOString(),
    source: 'GitHub Actions Windows runner',
    platform: os.platform(),
    release: os.release(),
    architecture: os.arch(),
    runnerImage: process.env.ImageOS ?? null,
    commit: process.env.GITHUB_SHA ?? null,
    baseUrl,
    viewport,
    userAgent: await page.evaluate(() => navigator.userAgent),
    screenshots,
  };
  await fs.writeFile(
    path.join(outputDirectory, 'windows-screenshot-proof.json'),
    `${JSON.stringify(metadata, null, 2)}\n`,
  );
  console.log(`Captured ${files.length} privacy-safe Windows screenshots in ${outputDirectory}.`);
} finally {
  await browser.close();
}
