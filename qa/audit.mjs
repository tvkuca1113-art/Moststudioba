/**
 * The checks the brief asks for, run against a production build.
 *
 *   BASE_URL=http://127.0.0.1:3109 node qa/audit.mjs
 *
 * Widths 360/390/430/768/1024/1440, both languages: no horizontal overflow,
 * exactly one <h1>, every link and control named, no nested interactives,
 * touch targets at 44px, text never under 13px, body copy at 17px and up.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3109";
const WIDTHS = [360, 390, 430, 768, 1024, 1440];

const ROUTES = [
  ["pocetna", "/", "/de"],
  ["projekti", "/projekti", "/de/projekte"],
  ["projekt", "/projekti/stolarija-hrast", "/de/projekte/stolarija-hrast"],
  ["usluge", "/usluge", "/de/leistungen"],
  ["kontakt", "/kontakt", "/de/kontakt"],
  ["demo", "/demo/stolarija-hrast", "/de/demo/stolarija-hrast"],
];

const problems = [];
const note = (where, what) => problems.push(`${where}: ${what}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 900 },
    hasTouch: width < 768,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();

  for (const [name, bs, de] of ROUTES) {
    for (const [locale, pathname] of [["bs", bs], ["de", de]]) {
      const where = `${name} ${locale} @${width}`;
      await page.goto(BASE + pathname, { waitUntil: "load" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });

      const r = await page.evaluate(() => {
        const name = (el) => {
          const aria = el.getAttribute("aria-label")?.trim();
          if (aria) return aria;
          const by = el.getAttribute("aria-labelledby");
          if (by) {
            const t = by.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? "").join(" ").trim();
            if (t) return t;
          }
          const t = el.textContent?.replace(/\s+/g, " ").trim();
          if (t) return t;
          const alt = el.querySelector("img[alt]")?.getAttribute("alt")?.trim();
          return alt || "";
        };
        const visible = (el) => {
          const s = getComputedStyle(el);
          if (s.visibility === "hidden" || s.display === "none") return false;
          if (el.getClientRects().length === 0) return false;
          // sr-only: clipped to a 1px box, and correct that way — a skip link
          // is meant to be invisible until it takes focus.
          const r = el.getBoundingClientRect();
          return !(r.width <= 1 && r.height <= 1);
        };

        const controls = [...document.querySelectorAll("a[href], button, [role='tab']")].filter(visible);
        const nameless = controls.filter((el) => !name(el)).map((el) => el.outerHTML.slice(0, 90));
        const small = controls
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.height < 44 || r.width < 24);
          })
          .map((el) => `${name(el).slice(0, 28)} ${Math.round(el.getBoundingClientRect().height)}px`);

        const tiny = [];
        const body = [];
        const main = document.querySelector("main") ?? document.body;
        for (const el of main.querySelectorAll("p, li, dd, span, a, button, label, summary")) {
          if (!visible(el)) continue;
          const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 12);
          if (!own) continue;
          const px = parseFloat(getComputedStyle(el).fontSize);
          if (px < 13) tiny.push(`${px}px ${el.textContent.trim().slice(0, 30)}`);
          if (el.tagName === "P" && el.textContent.trim().length > 90) body.push(px);
        }

        return {
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          h1: document.querySelectorAll("h1").length,
          nested: document.querySelectorAll("a a, a button, button a").length,
          nameless,
          small,
          tiny,
          minBody: body.length ? Math.min(...body) : null,
        };
      });

      if (r.overflow > 1) note(where, `horizontal overflow ${r.overflow}px`);
      if (r.h1 !== 1) note(where, `${r.h1} <h1> elements`);
      if (r.nested) note(where, `${r.nested} nested interactive elements`);
      if (r.nameless.length) note(where, `unnamed control: ${r.nameless[0]}`);
      if (r.small.length) note(where, `target under 44px: ${r.small.join(" | ")}`);
      if (r.tiny.length) note(where, `text under 13px: ${r.tiny[0]}`);
      if (r.minBody !== null && r.minBody < 17) note(where, `body copy at ${r.minBody}px`);
    }
  }
  await ctx.close();
}

// ---- mobile menu: expanded state, Escape, focus return ----
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  const toggle = page.locator("header button[aria-expanded]").first();
  if ((await toggle.count()) === 0) note("menu", "no button with aria-expanded in the header");
  else {
    if ((await toggle.getAttribute("aria-expanded")) !== "false") note("menu", "starts expanded");
    await toggle.click();
    if ((await toggle.getAttribute("aria-expanded")) !== "true") note("menu", "aria-expanded not true after opening");
    await page.keyboard.press("Escape");
    if ((await toggle.getAttribute("aria-expanded")) !== "false") note("menu", "Escape does not close");
    const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-expanded"));
    if (focused !== "false") note("menu", "focus does not return to the toggle after Escape");
  }
  await ctx.close();
}

// ---- language switch keeps the page ----
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const [from, expect] of [
    ["/projekti/stolarija-hrast", "/de/projekte/stolarija-hrast"],
    ["/usluge", "/de/leistungen"],
    ["/kontakt", "/de/kontakt"],
  ]) {
    await page.goto(BASE + from, { waitUntil: "load" });
    const href = await page.locator("header a[hreflang='de']").first().getAttribute("href");
    if (href !== expect) note("language", `${from} switches to ${href}, expected ${expect}`);
    const flag = await page.evaluate(() => /[\u{1F1E6}-\u{1F1FF}]/u.test(document.body.innerText));
    if (flag) note("language", "a flag emoji is used as a language marker");
  }
  await ctx.close();
}

// ---- the hero gallery: keyboard, height stability, no autoplay ----
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  const heroHeight = () => page.evaluate(() => Math.round(document.querySelector("section.bg-ink").getBoundingClientRect().height));
  const before = await heroHeight();
  const first = page.locator("[role='tab']").first();
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(500);
  const selected = await page.evaluate(() => [...document.querySelectorAll("[role='tab']")].findIndex((t) => t.getAttribute("aria-selected") === "true"));
  if (selected !== 1) note("gallery", `ArrowRight selected panel ${selected}, expected 1`);
  const after = await heroHeight();
  if (Math.abs(after - before) > 1) note("gallery", `section height moved ${before} -> ${after}`);
  const visiblePanels = await page.evaluate(() =>
    [...document.querySelectorAll("[role='tabpanel']")].filter((p) => getComputedStyle(p).visibility !== "hidden").length,
  );
  if (visiblePanels !== 1) note("gallery", `${visiblePanels} panels visible at once`);
  await page.waitForTimeout(2500);
  const stillSelected = await page.evaluate(() => [...document.querySelectorAll("[role='tab']")].findIndex((t) => t.getAttribute("aria-selected") === "true"));
  if (stillSelected !== selected) note("gallery", "the panel changed on its own — autoplay");
  await ctx.close();
}

// ---- 200% zoom at 1280 logical = 640 CSS px ----
{
  const ctx = await browser.newContext({ viewport: { width: 640, height: 512 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  for (const p of ["/", "/de", "/kontakt", "/projekti/stolarija-hrast"]) {
    await page.goto(BASE + p, { waitUntil: "load" });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (over > 1) note(`zoom200 ${p}`, `horizontal overflow ${over}px`);
  }
  await ctx.close();
}

await browser.close();

if (problems.length === 0) console.log("All checks passed.");
else {
  console.log(`${problems.length} problems:\n`);
  for (const p of problems) console.log(" -", p);
}
