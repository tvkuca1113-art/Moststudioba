import { chromium } from "@playwright/test";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const OUT = process.env.SHOT_DIR ?? "qa/shots";

const routes = [
  ["/", "home-bs"],
  ["/projekti", "projects-bs"],
  ["/projekti/ordinacija-lipa", "case-clinic-bs"],
  ["/projekti/stolarija-hrast", "case-trades-bs"],
  ["/projekti/meridijan-savjetovanje", "case-advisory-bs"],
  ["/usluge", "services-bs"],
  ["/kontakt", "contact-bs"],
  ["/demo/ordinacija-lipa", "demo-clinic-bs"],
  ["/demo/stolarija-hrast", "demo-trades-bs"],
  ["/demo/meridijan-savjetovanje", "demo-advisory-bs"],
  ["/de", "home-de"],
  ["/de/projekte", "projects-de"],
  ["/de/projekte/stolarija-hrast", "case-trades-de"],
  ["/de/leistungen", "services-de"],
  ["/de/kontakt", "contact-de"],
  ["/de/demo/meridijan-savjetovanje", "demo-advisory-de"],
];

const widths = Number(process.env.FULL) ? [360, 390, 768, 1440] : [1440, 390];
const problems = [];

const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 700 ? 844 : 900 },
    deviceScaleFactor: 1,
  });
  for (const [route, name] of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

    const response = await page.goto(BASE + route, { waitUntil: "networkidle" });
    if (!response || response.status() !== 200) {
      problems.push(`${route} @${width}: HTTP ${response?.status()}`);
    }
    // Walk the page so every scroll-reveal has actually been triggered before
    // we measure or screenshot it. Smooth scrolling is disabled first, or
    // scrollTo() animates and the loop never reaches the bottom.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const step = Math.round(window.innerHeight * 0.7);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
    });
    await page.waitForTimeout(500);

    const pending = await page.evaluate(
      () => document.querySelectorAll('[data-reveal="pending"]').length,
    );
    if (pending > 0) problems.push(`${route} @${width}: ${pending} elements still hidden after scrolling`);

    // horizontal overflow
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return { scroll: doc.scrollWidth, client: doc.clientWidth };
    });
    if (overflow.scroll > overflow.client + 1) {
      problems.push(`${route} @${width}: horizontal overflow ${overflow.scroll} > ${overflow.client}`);
    }

    // text that is too small anywhere in the main content
    const tiny = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll("main p, main li, main a, main button, main label, main h1, main h2, main h3")) {
        const text = el.textContent?.trim() ?? "";
        if (!text || el.closest("[aria-hidden='true']")) continue;
        // demo previews are rendered at a real width then scaled, so their
        // computed font-size is the un-scaled one; skip them here.
        if (el.closest("[data-preview-scaled]")) continue;
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (size < 13) bad.push(`${el.tagName}.${size}px: ${text.slice(0, 40)}`);
      }
      return bad.slice(0, 4);
    });
    if (tiny.length) problems.push(`${route} @${width}: small text ${JSON.stringify(tiny)}`);

    if (errors.length) problems.push(`${route} @${width}: console ${JSON.stringify(errors.slice(0, 3))}`);

    if (width === 1440 || width === 390) {
      await page.screenshot({
        path: path.join(OUT, `${name}-${width}.png`),
        fullPage: width === 1440 && !route.includes("/demo/"),
      });
    }
    await page.close();
  }
  await context.close();
}

await browser.close();

console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "NO PROBLEMS FOUND");
