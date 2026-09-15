import { chromium } from "@playwright/test";
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const OUT = process.env.SHOT_DIR ?? "qa/shots";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); else console.log("  ok:", m); };

const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });

// ---- clipboard fallback ----------------------------------------------------
console.log("clipboard fallback");
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
// Remove the async clipboard API and make execCommand fail, i.e. the worst case.
await page.addInitScript(() => {
  Object.defineProperty(navigator, "clipboard", { get: () => undefined, configurable: true });
  document.addEventListener("DOMContentLoaded", () => {
    document.execCommand = () => false;
  });
});
await page.goto(BASE + "/kontakt", { waitUntil: "networkidle" });
await page.getByLabel(/Čime se bavite/).fill("frizerski salon");
await page.getByText("Nova stranica", { exact: true }).click();
await page.getByText("Da nam se javi", { exact: true }).click();
await page.getByRole("button", { name: /Kopiraj poruku/ }).click();
await page.waitForTimeout(400);
ok(await page.getByText(/Kopiranje nije uspjelo/).last().isVisible(), "failure message shown when copying is blocked");
ok(await page.getByRole("button", { name: /Označi cijeli tekst/ }).isVisible(), "manual select fallback offered");
await page.getByRole("button", { name: /Označi cijeli tekst/ }).click();
const selected = await page.evaluate(() => window.getSelection()?.toString() ?? "");
ok(selected.includes("frizerski salon"), "the message is actually selected for manual copying");
await page.screenshot({ path: `${OUT}/edge-clipboard-fallback.png` });
await ctx.close();

// ---- mobile menu -----------------------------------------------------------
console.log("mobile menu");
const m = await browser.newContext({ viewport: { width: 360, height: 780 }, hasTouch: true });
const mp = await m.newPage();
await mp.goto(BASE + "/", { waitUntil: "networkidle" });
const burger = mp.locator('button[aria-controls="mobile-menu"]');
ok((await burger.getAttribute("aria-expanded")) === "false", "menu starts closed");
await burger.tap();
await mp.waitForTimeout(350);
ok((await burger.getAttribute("aria-expanded")) === "true", "menu opens on tap");
ok(await mp.locator("#mobile-menu").getByRole("link", { name: "Projekti" }).isVisible(), "menu links visible");
const box = await mp.locator("#mobile-menu").getByRole("link", { name: "Projekti" }).boundingBox();
ok((box?.height ?? 0) >= 44, `menu targets are at least 44px tall (${Math.round(box?.height ?? 0)})`);
await mp.screenshot({ path: `${OUT}/edge-mobile-menu.png` });
await mp.keyboard.press("Escape");
await mp.waitForTimeout(300);
ok((await burger.getAttribute("aria-expanded")) === "false", "Escape closes the menu");
await mp.locator("#mobile-menu").getByRole("link", { name: "Projekti" }).isVisible().catch(() => {});
await burger.tap();
await mp.waitForTimeout(250);
await mp.locator("#mobile-menu").getByRole("link", { name: "Usluge" }).tap();
await mp.waitForURL("**/usluge");
await mp.waitForTimeout(300);
ok((await burger.getAttribute("aria-expanded")) === "false", "menu closes after navigating");

// touch target audit on a mobile page
const smallTargets = await mp.evaluate(() => {
  const bad = [];
  for (const el of document.querySelectorAll("a, button, summary, label")) {
    if (el.closest('[aria-hidden="true"]') || !el.getClientRects().length) continue;
    // Skip-links are visually hidden until focused; that is the correct pattern.
    if (el.classList.contains("sr-only")) continue;
    const r = el.getBoundingClientRect();
    if (r.height < 40 && r.width < 40) bad.push(`${el.tagName} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || "").trim().slice(0, 28)}"`);
  }
  return bad.slice(0, 6);
});
ok(smallTargets.length === 0, `touch targets large enough (${JSON.stringify(smallTargets)})`);
await m.close();

// ---- lab performance -------------------------------------------------------
console.log("performance (lab)");
const p = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const pp = await p.newPage();
let transferred = 0;
const byType = {};
pp.on("response", async (res) => {
  try {
    const len = Number((await res.allHeaders())["content-length"] || 0);
    transferred += len;
    const t = res.request().resourceType();
    byType[t] = (byType[t] || 0) + len;
  } catch { /* ignore */ }
});
await pp.goto(BASE + "/", { waitUntil: "networkidle" });
await pp.waitForTimeout(1500);
const vitals = await pp.evaluate(
  () =>
    new Promise((resolve) => {
      const out = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        out.lcp = entries[entries.length - 1].startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) out.cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
      setTimeout(() => resolve(out), 800);
    }),
);
console.log(`  LCP ${Math.round(vitals.lcp)}ms · CLS ${vitals.cls.toFixed(4)}`);
console.log(`  transferred ${(transferred / 1024).toFixed(0)} kB`, Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, `${(v / 1024).toFixed(0)}kB`])));
ok(vitals.cls < 0.1, `CLS under 0.1 (${vitals.cls.toFixed(4)})`);
ok(vitals.lcp < 2500, `LCP under 2.5s in lab (${Math.round(vitals.lcp)}ms)`);
await p.close();

await browser.close();
console.log(fails.length ? "\nFAILURES:\n" + fails.join("\n") : "\nALL EDGE CHECKS PASSED");
