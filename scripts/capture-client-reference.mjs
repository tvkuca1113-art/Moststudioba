// Capture the public client website without submitting forms or changing its UI.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const sourceUrl = 'https://mirjanamassage.vercel.app/';
const output = 'qa/client-reference';
const maxAssetBytes = 150_000;
const maxTotalBytes = 450_000;
const captures = [
  { key: 'desktop', viewport: { width: 1440, height: 1000 }, outputWidth: 1200 },
  { key: 'mobile', viewport: { width: 390, height: 844 }, outputWidth: 390 },
  { key: 'services', viewport: { width: 1440, height: 1000 }, outputWidth: 1200 },
];
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const assets = [];

async function settle(page) {
  await page.evaluate(async () => {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
    await Promise.race([document.fonts.ready, timeout(8000)]);
    const images = [...document.images].filter(image => {
      const rect = image.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
    });
    await Promise.race([
      Promise.all(images.map(image => image.complete ? Promise.resolve() : new Promise(resolve => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      }))),
      timeout(8000),
    ]);
  });
  await page.waitForTimeout(500);
}

try {
  for (const capture of captures) {
    const context = await browser.newContext({
      viewport: capture.viewport,
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    try {
      const response = await page.goto(sourceUrl, { waitUntil: 'load', timeout: 45000 });
      assert.equal(response?.status(), 200, 'Client reference must return HTTP 200');
      const h1 = (await page.locator('h1').allTextContents()).join(' ').replace(/\s+/g, ' ').trim();
      assert.match(h1, /Massage.*Wellness.*Mirjana/i, 'Confirm the client source identity');
      await settle(page);
      let selector = 'viewport';
      let raw;
      if (capture.key === 'services') {
        let section = page.locator('#massagen');
        if (await section.count() !== 1) {
          section = page.getByRole('heading', { level: 2, name: 'Massagen', exact: true }).locator('xpath=ancestor::section[1]');
          selector = 'h2[Massagen].closest(section)';
        } else {
          selector = '#massagen';
        }
        assert.equal(await section.count(), 1, 'Find the actual Massagen section');
        for (const image of await section.locator('img').all()) {
          if (await image.isVisible()) {
            await image.scrollIntoViewIfNeeded();
            await settle(page);
          }
        }
        await section.scrollIntoViewIfNeeded();
        await settle(page);
        raw = await section.screenshot({ type: 'png', animations: 'disabled' });
      } else {
        await page.evaluate(() => window.scrollTo(0, 0));
        await settle(page);
        raw = await page.screenshot({ type: 'png', fullPage: false, animations: 'disabled' });
      }
      await writeFile(path.join(output, 'mirjana-' + capture.key + '-original.png'), raw);
      let webp;
      let quality;
      for (quality of [80, 76, 72, 68, 64, 60, 56]) {
        webp = await sharp(raw).resize({ width: capture.outputWidth, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
        if (webp.length <= maxAssetBytes) break;
      }
      assert(webp && webp.length <= maxAssetBytes, 'Each client screenshot must fit within 150,000 bytes');
      const metadata = await sharp(webp).metadata();
      const sha256 = createHash('sha256').update(webp).digest('hex');
      const file = 'mirjana-' + capture.key + '-' + sha256.slice(0, 10) + '.webp';
      await writeFile(path.join(output, file), webp);
      assets.push({
        buffer: webp,
        manifest: {
          key: capture.key, file, sourceUrl, renderedUrl: page.url(), h1,
          capturedAt: new Date().toISOString(), viewport: capture.viewport,
          selector, width: metadata.width, height: metadata.height,
          bytes: webp.length, sha256, quality, mimeType: 'image/webp',
        },
      });
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

assert.equal(assets.length, 3, 'All three real captures must exist');
assert(assets.reduce((sum, asset) => sum + asset.buffer.length, 0) <= maxTotalBytes, 'Total client screenshots must fit within 450,000 bytes');
const manifest = assets.map(asset => asset.manifest);
await writeFile(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('CLIENT_ASSET_MANIFEST ' + JSON.stringify(manifest));
for (const asset of assets) {
  const base64 = asset.buffer.toString('base64');
  const count = Math.ceil(base64.length / 6000);
  for (let index = 0; index < count; index++) {
    console.log('CLIENT_ASSET_CHUNK ' + asset.manifest.file + ' ' + index + ' ' + count + ' ' + base64.slice(index * 6000, (index + 1) * 6000));
  }
}
