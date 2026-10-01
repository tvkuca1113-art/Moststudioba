// Capture the built offer presentation for review; regression tests stay in the existing QA scripts.
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const origin = 'http://127.0.0.1:3102';
const output = 'qa/offer-review';
const byteBudget = 150000;
const plans = [
  { key: 'hero-bs-desktop', route: '/', locale: 'bs', kind: 'hero', width: 1440 },
  { key: 'hero-bs-mobile', route: '/', locale: 'bs', kind: 'hero', width: 390 },
  { key: 'hero-de-mobile', route: '/de', locale: 'de', kind: 'hero', width: 390 },
  { key: 'offer-bs-desktop', route: '/usluge', locale: 'bs', kind: 'offer', width: 1440 },
  { key: 'offer-bs-mobile', route: '/vodic/cijena-web-stranice', locale: 'bs', kind: 'offer', width: 390 },
  { key: 'offer-de-mobile', route: '/de/ratgeber/website-kosten', locale: 'de', kind: 'offer', width: 390 },
];
const snapshots = [];
const server = spawn(process.execPath, [
  require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', '3102',
], { stdio: 'inherit' });
let browser;

async function prepareVisibleImages(page) {
  await page.waitForFunction(() => Array.from(document.querySelectorAll('main img')).filter(image => {
    const rect = image.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
  }).every(image => image.complete && image.naturalWidth > 0), null, { timeout: 15000 });
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('main img')).filter(image => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
    });
    await Promise.all(images.map(image => image.decode()));
  });
}

async function saveSnapshot(page, plan, viewport) {
  let raw;
  let offer;
  if (plan.kind === 'offer') {
    const target = page.locator('main section#budzet[data-starter-offer]');
    assert.equal(await target.count(), 1, 'The offer is available for visual review');
    await target.scrollIntoViewIfNeeded();
    offer = await target.evaluate(element => ({
      amount: element.getAttribute('data-starter-offer'),
      text: element.innerText,
      links: Array.from(element.querySelectorAll('a[href]')).map(link => ({
        label: link.innerText, href: link.getAttribute('href'),
      })),
    }));
    // The sticky navigation is outside the offer, so omit its overlap only from this capture.
    raw = await target.screenshot({
      type: 'png', animations: 'disabled', style: 'header { visibility: hidden !important; }',
    });
  } else {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await prepareVisibleImages(page);
    raw = await page.screenshot({ type: 'png', animations: 'disabled' });
  }
  await writeFile(path.join(output, plan.key + '-original.png'), raw);
  let buffer;
  let quality;
  for (quality of [80, 76, 72, 68, 64, 60, 56]) {
    buffer = await sharp(raw).resize({
      width: plan.width === 1440 ? 1200 : plan.width, withoutEnlargement: true,
    }).webp({ quality, effort: 6 }).toBuffer();
    if (buffer.length <= byteBudget) break;
  }
  assert(buffer && buffer.length <= byteBudget, 'Review image fits its 150 KB byte budget');
  const metadata = await sharp(buffer).metadata();
  const sha256 = createHash('sha256').update(buffer).digest('hex');
  const file = plan.key + '-' + sha256.slice(0, 10) + '.webp';
  await writeFile(path.join(output, file), buffer);
  snapshots.push({
    buffer,
    manifest: {
      key: plan.key, file, route: plan.route, locale: plan.locale, viewport,
      selector: plan.kind === 'offer' ? 'main section#budzet[data-starter-offer]' : 'page viewport at scrollY 0',
      screenshotStyle: plan.kind === 'offer' ? 'header { visibility: hidden !important; }' : null,
      width: metadata.width, height: metadata.height, bytes: buffer.length,
      quality, sha256, mimeType: 'image/webp', ...(offer ? { offer } : {}),
    },
  });
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error('Production server exited before offer capture');
    try {
      ready = (await fetch(origin, { signal: AbortSignal.timeout(1000) })).ok;
    } catch {
      // Next may still be starting.
    }
    if (ready) break;
    await delay(500);
  }
  assert(ready, 'Production server became ready');
  await mkdir(output, { recursive: true });
  browser = await chromium.launch();

  for (const plan of plans) {
    const viewport = { width: plan.width, height: plan.width === 1440 ? 1000 : 844 };
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    try {
      const response = await page.goto(origin + plan.route, { waitUntil: 'domcontentloaded' });
      assert.equal(response?.status(), 200, 'Capture route returns HTTP 200');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const metrics = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      }));
      // The existing hero QA already checks the homepage; these changed offer pages need this layout check.
      if (plan.kind === 'offer') {
        assert(metrics.documentWidth <= metrics.viewport + 1, 'Offer page has no horizontal overflow');
      }
      console.log('OFFER_REVIEW_CAPTURE ' + JSON.stringify({ key: plan.key, route: plan.route, ...metrics }));
      await saveSnapshot(page, plan, viewport);
    } catch (error) {
      console.error('OFFER_REVIEW_FAILURE ' + JSON.stringify({ key: plan.key, route: plan.route, message: error.message }));
      await page.screenshot({ path: path.join(output, plan.key + '-failure.png'), fullPage: true }).catch(() => {});
      throw error;
    } finally {
      await page.close();
    }
  }

  const manifest = {
    version: 1,
    buildCommit: process.env.GITHUB_SHA ?? null,
    totalBytes: snapshots.reduce((total, snapshot) => total + snapshot.manifest.bytes, 0),
    screenshots: snapshots.map(snapshot => snapshot.manifest),
  };
  assert(manifest.totalBytes <= 900000, 'Review images fit the combined 900 KB byte budget');
  await writeFile(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log('OFFER_REVIEW_MANIFEST ' + JSON.stringify(manifest));
  for (const snapshot of snapshots) {
    const base64 = snapshot.buffer.toString('base64');
    const count = Math.ceil(base64.length / 6000);
    for (let index = 0; index < count; index++) {
      console.log('OFFER_REVIEW_CHUNK ' + snapshot.manifest.file + ' ' + index + ' ' + count + ' ' + base64.slice(index * 6000, (index + 1) * 6000));
    }
  }
  console.log('OFFER_REVIEW_CAPTURE_COMPLETE ' + JSON.stringify({ screenshots: snapshots.length, totalBytes: manifest.totalBytes }));
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
