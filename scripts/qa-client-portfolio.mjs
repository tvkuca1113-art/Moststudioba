// Verify the real client project in the built site, including navigation and rendered images.
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
const origin = 'http://127.0.0.1:3101';
const output = 'qa/client-portfolio';
const clientUrl = 'https://mirjanamassage.vercel.app/';
const slug = 'mirjana-massage';
const cases = { bs: '/projekti/' + slug, de: '/de/projekte/' + slug };
const pages = [
  { route: '/', locale: 'bs', kind: 'home', counterpart: '/de' },
  { route: '/de', locale: 'de', kind: 'home', counterpart: '/' },
  { route: '/projekti', locale: 'bs', kind: 'projects', counterpart: '/de/projekte' },
  { route: '/de/projekte', locale: 'de', kind: 'projects', counterpart: '/projekti' },
  { route: cases.bs, locale: 'bs', kind: 'case', counterpart: cases.de },
  { route: cases.de, locale: 'de', kind: 'case', counterpart: cases.bs },
];
const snapshotPlan = {
  'home-bs-1440': { key: 'home-client-bs-desktop', outputWidth: 1200 },
  'home-bs-390': { key: 'home-client-bs-mobile', outputWidth: 390 },
  'case-bs-1440': { key: 'case-bs-desktop', outputWidth: 1200 },
  'case-bs-390': { key: 'case-bs-mobile', outputWidth: 390 },
  'case-de-1440': { key: 'case-de-desktop', outputWidth: 1200 },
};
const results = [];
const snapshots = [];
const server = spawn(process.execPath, [
  require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', '3101',
], { stdio: 'inherit' });
let browser;

async function decodeClientImages(scope, page) {
  const images = await scope.locator('img').all();
  assert(images.length, 'Client screenshots must be rendered');
  const decoded = [];
  for (const image of images) {
    // Native lazy loading and responsive source selection happen after scrolling.
    // Wait for actual pixels before asking decode() to resolve the current source.
    await image.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    try {
      const handle = await image.elementHandle();
      assert(handle, 'Client image remains mounted');
      await page.waitForFunction(element => element.complete && element.naturalWidth > 0, handle, { timeout: 15000 });
      await image.evaluate(element => element.decode());
      await handle.dispose();
    } catch (error) {
      const state = await image.evaluate(element => ({
        kind: element.closest('figure')?.getAttribute('data-client-screenshot'),
        src: element.getAttribute('src'), srcset: element.getAttribute('srcset'),
        currentSrc: element.currentSrc, loading: element.loading,
        complete: element.complete, naturalWidth: element.naturalWidth,
        rect: element.getBoundingClientRect().toJSON(), scrollY,
      }));
      console.log('CLIENT_IMAGE_FAILURE ' + JSON.stringify(state));
      throw error;
    }
    const data = await image.evaluate(element => ({
      src: element.currentSrc,
      width: element.naturalWidth,
      height: element.naturalHeight,
      alt: element.alt,
    }));
    assert(data.width > 0 && data.height > 0, 'Client image has actual decoded pixels');
    assert(data.alt.trim(), 'Client screenshot has a meaningful alternative');
    assert(decodeURIComponent(data.src).includes('/images/projects/mirjana/'), 'Client image uses the actual captured reference assets');
    decoded.push(data);
  }
  return decoded;
}

async function saveSnapshot(page, scope, definition, viewport, plan) {
  const target = scope;
  const byteBudget = definition.kind === 'case' ? 200000 : 120000;
  assert.equal(await target.count(), 1, 'Screenshot target exists');
  await target.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const raw = await target.screenshot({ type: 'png', animations: 'disabled' });
  await writeFile(path.join(output, plan.key + '-original.png'), raw);
  let buffer;
  let quality;
  for (quality of [80, 76, 72, 68, 64, 60, 56]) {
    buffer = await sharp(raw).resize({ width: plan.outputWidth, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
    if (buffer.length <= byteBudget) break;
  }
  assert(buffer && buffer.length <= byteBudget, 'Visual review snapshot fits its bounded byte budget');
  const metadata = await sharp(buffer).metadata();
  const sha256 = createHash('sha256').update(buffer).digest('hex');
  const file = plan.key + '-' + sha256.slice(0, 10) + '.webp';
  await writeFile(path.join(output, file), buffer);
  snapshots.push({
    buffer,
    manifest: {
      key: plan.key, file, route: definition.route, locale: definition.locale,
      viewport, selector: definition.kind === 'case' ? '[data-client-case]' : '[data-project-kind="client"]',
      width: metadata.width, height: metadata.height, bytes: buffer.length,
      sha256, quality, mimeType: 'image/webp',
    },
  });
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error('Production server exited before portfolio checks');
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

  for (const definition of pages) {
    for (const width of [320, 390, 768, 1440]) {
      const viewport = { width, height: width === 1440 ? 1000 : 844 };
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      page.on('response', response => {
        if (response.url().includes('/_next/image') && response.status() >= 400) {
          console.log('CLIENT_IMAGE_HTTP_ERROR ' + JSON.stringify({ url: response.url(), status: response.status() }));
        }
      });
      try {
        const response = await page.goto(origin + definition.route, { waitUntil: 'load' });
        assert.equal(response?.status(), 200, 'Published portfolio route returns HTTP 200');
        assert.equal(await page.locator('html').getAttribute('lang'), definition.locale);
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('main h1').count(), 1, 'One main page heading');
        const selector = definition.kind === 'case'
          ? '[data-client-case="' + slug + '"]'
          : 'article[data-project-kind="client"][data-client-project="' + slug + '"]';
        const scope = page.locator('main').locator(selector);
        assert.equal(await scope.count(), 1, 'One real client project in the intended page');
        const copy = await scope.innerText();
        assert(/Mirjana/i.test(copy), 'The client name is visible');
        assert(definition.locale === 'bs' ? /Klijentski projekt/i.test(copy) : /Kundenprojekt/i.test(copy), 'Client work is labelled accurately');
        assert(!/Demo koncept|Demo-Konzept/i.test(copy), 'The real client is not labelled a demo');
        assert.equal(await scope.locator('iframe').count(), 0, 'The reference uses screenshots rather than an embedded website');
        const externalLinks = await scope.locator('a[href="' + clientUrl + '"]').all();
        assert(externalLinks.length, 'The real client website can be opened');
        for (const link of externalLinks) {
          assert.equal(await link.getAttribute('target'), '_blank');
          assert(/\bnoopener\b/.test(await link.getAttribute('rel') ?? ''), 'The new tab does not retain its opener');
        }
        const hrefs = await scope.locator('a[href]').evaluateAll(links => links.map(link => link.getAttribute('href')));
        assert(!hrefs.some(href => /^\/(?:de\/)?demo\/mirjana-massage(?:[/?#]|$)/.test(href)), 'Client links do not lead to an invented demo route');
        if (definition.kind !== 'case') {
          assert(await scope.locator('a[href="' + cases[definition.locale] + '"]').count(), 'Card links to the published case study');
        }
        const images = await decodeClientImages(scope, page);
        const metrics = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        }));
        assert(metrics.documentWidth <= metrics.viewport + 1, 'Client portfolio has no horizontal overflow at ' + definition.route + ' width ' + width);
        const otherLocale = definition.locale === 'bs' ? 'de' : 'bs';
        for (const languageLink of await page.locator('header a[hreflang="' + otherLocale + '"], #mobile-menu a[hreflang="' + otherLocale + '"]').all()) {
          assert.equal(await languageLink.getAttribute('href'), definition.counterpart, 'Language links preserve the current route');
        }
        assert(await page.locator('header a[hreflang="' + otherLocale + '"]').count(), 'Header contains the translated route');
        if (definition.kind === 'case') {
          const contactHref = (definition.locale === 'bs' ? '/kontakt' : '/de/kontakt') + '#top';
          assert(await scope.locator('a[href="' + contactHref + '"]').count(), 'The case study has a local contact action');
        }
        const plan = snapshotPlan[definition.kind + '-' + definition.locale + '-' + width];
        if (plan) await saveSnapshot(page, scope, definition, viewport, plan);
        results.push({ route: definition.route, locale: definition.locale, width, ...metrics, decodedImages: images.length });
        console.log('CLIENT_PORTFOLIO_PASS ' + JSON.stringify(results.at(-1)));

        if (definition.kind !== 'case' && width === 390) {
          await scope.locator('a[href="' + cases[definition.locale] + '"]').first().click();
          await page.waitForURL(origin + cases[definition.locale]);
          assert.equal(await page.locator('[data-client-case="' + slug + '"]').count(), 1, 'The visible case action opens the actual client case');
        }
        if (definition.kind === 'case' && width === 1440) {
          const contactHref = (definition.locale === 'bs' ? '/kontakt' : '/de/kontakt') + '#top';
          await scope.locator('a[href="' + contactHref + '"]').first().click();
          await page.waitForURL(origin + contactHref);
          assert(await page.locator('main').isVisible(), 'The contact action opens the local contact page');
          await page.goto(origin + definition.route, { waitUntil: 'load' });
          await page.locator('header a[hreflang="' + otherLocale + '"]').click();
          await page.waitForURL(origin + definition.counterpart);
          assert.equal(await page.locator('html').getAttribute('lang'), otherLocale);
        }
        if (definition.kind === 'case' && width === 390) {
          await page.getByRole('button', { name: definition.locale === 'bs' ? 'Otvori meni' : 'Menü öffnen', exact: true }).click();
          await page.locator('#mobile-menu').waitFor({ state: 'visible' });
          await page.locator('#mobile-menu a[hreflang="' + otherLocale + '"]').click();
          await page.waitForURL(origin + definition.counterpart);
          assert.equal(await page.locator('[data-client-case="' + slug + '"]').count(), 1, 'Mobile language switching preserves the client case');
        }
      } catch (error) {
        await page.screenshot({ path: path.join(output, 'failure-' + definition.kind + '-' + definition.locale + '-' + width + '.png'), fullPage: true }).catch(() => {});
        throw error;
      } finally {
        await page.close();
      }
    }
  }
  assert.equal(results.length, 24, 'Every route and width passed');
  assert.equal(snapshots.length, 5, 'All five visual review captures exist');
  assert(snapshots.reduce((sum, asset) => sum + asset.buffer.length, 0) <= 800000, 'Review images fit within 800,000 bytes');
  const manifest = snapshots.map(asset => asset.manifest);
  await writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2) + '\n');
  await writeFile(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log('CLIENT_QA_MANIFEST ' + JSON.stringify(manifest));
  if (process.env.CLIENT_QA_EXPORT_BASE64 === 'true') {
    for (const asset of snapshots) {
      const base64 = asset.buffer.toString('base64');
      const count = Math.ceil(base64.length / 6000);
      for (let index = 0; index < count; index++) {
        console.log('CLIENT_QA_CHUNK ' + asset.manifest.file + ' ' + index + ' ' + count + ' ' + base64.slice(index * 6000, (index + 1) * 6000));
      }
    }
  }
  console.log('PASS: 24 client portfolio layouts, decoded reference images, real client links, case navigation, exact desktop/mobile language switches and contact actions.');
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
