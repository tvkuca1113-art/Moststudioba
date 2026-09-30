// Check the rendered hero for clipping and horizontal overflow in both languages.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { setTimeout as delay } from 'node:timers/promises';

const require = createRequire(import.meta.url);
const origin = 'http://127.0.0.1:3100';
const server = spawn(process.execPath, [
  require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', '3100',
], { stdio: 'inherit' });
let browser;

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error('Production server exited');
    try {
      ready = (await fetch(origin, { signal: AbortSignal.timeout(1000) })).ok;
    } catch {
      // The server may still be starting.
    }
    if (ready) break;
    await delay(500);
  }
  if (!ready) throw new Error('Production server did not become ready');

  await mkdir('qa/hero-layout', { recursive: true });
  browser = await chromium.launch();
  for (const route of ['/', '/de']) {
    for (const width of [320, 390, 768, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      const response = await page.goto(origin + route);
      if (response?.status() !== 200) throw new Error('Unexpected HTTP status: ' + route);
      await page.evaluate(() => document.fonts.ready);
      const heading = page.locator('main h1');
      if (await heading.count() !== 1 || !(await heading.isVisible())) {
        throw new Error('Expected one visible main heading');
      }
      const metrics = await heading.evaluate(element => {
        const viewport = document.documentElement.clientWidth;
        const section = element.closest('section').getBoundingClientRect();
        const range = document.createRange();
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const rectangles = [];
        while (walker.nextNode()) {
          if (!walker.currentNode.textContent.trim()) continue;
          range.selectNodeContents(walker.currentNode);
          for (const rect of range.getClientRects()) {
            rectangles.push({ left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom });
          }
        }
        return {
          viewport,
          documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          headingHeight: element.getBoundingClientRect().height,
          rectangles,
          clipped: rectangles.some(rect =>
            rect.left < -2 || rect.right > viewport + 2 ||
            rect.left < section.left - 2 || rect.right > section.right + 2 ||
            rect.top < section.top - 2 || rect.bottom > section.bottom + 2),
        };
      });
      await page.screenshot({
        path: 'qa/hero-layout/' + (route === '/' ? 'bs' : 'de') + '-' + width + '.png',
        fullPage: true,
      });
      console.log(JSON.stringify({ route, width, ...metrics }));
      if (metrics.documentWidth > metrics.viewport + 1 || metrics.clipped || !metrics.rectangles.length) {
        throw new Error('Hero overflow or clipping: ' + route + ' at ' + width);
      }
      await page.close();
    }
  }
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
