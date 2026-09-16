/**
 * Full-page desktop and mobile captures of every route, both languages,
 * plus the measurements the audit asks about (page height, link names).
 *
 * Usage: OUT=<dir> BASE_URL=http://127.0.0.1:3100 node qa/snapshot.mjs
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3100";
const OUT = process.env.OUT ?? "/tmp/shots";

const ROUTES = [
  ["pocetna", "/", "/de"],
  ["projekti", "/projekti", "/de/projekte"],
  ["projekt-lipa", "/projekti/ordinacija-lipa", "/de/projekte/ordinacija-lipa"],
  ["projekt-hrast", "/projekti/stolarija-hrast", "/de/projekte/stolarija-hrast"],
  ["projekt-meridijan", "/projekti/meridijan-savjetovanje", "/de/projekte/meridijan-savjetovanje"],
  ["usluge", "/usluge", "/de/leistungen"],
  ["kontakt", "/kontakt", "/de/kontakt"],
  ["demo-lipa", "/demo/ordinacija-lipa", "/de/demo/ordinacija-lipa"],
  ["demo-hrast", "/demo/stolarija-hrast", "/de/demo/stolarija-hrast"],
  ["demo-meridijan", "/demo/meridijan-savjetovanje", "/de/demo/meridijan-savjetovanje"],
];

const DEVICES = [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
];

const measurements = [];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

for (const [device, width, height] of DEVICES) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const [name, bsPath, dePath] of ROUTES) {
    for (const [locale, pathname] of [["bs", bsPath], ["de", dePath]]) {
      await page.goto(`${BASE}${pathname}`, { waitUntil: "load" });
      // Settle lazy images that are inside the viewport after a full scroll.
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 200));
      });

      const stats = await page.evaluate(() => {
        const nameOf = (el) => {
          const aria = el.getAttribute("aria-label")?.trim();
          if (aria) return aria;
          const labelledby = el.getAttribute("aria-labelledby");
          if (labelledby) {
            const text = labelledby
              .split(/\s+/)
              .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
              .join(" ")
              .trim();
            if (text) return text;
          }
          const text = el.textContent?.replace(/\s+/g, " ").trim();
          if (text) return text;
          const img = el.querySelector("img[alt]");
          const alt = img?.getAttribute("alt")?.trim();
          if (alt) return alt;
          return "";
        };

        const links = [...document.querySelectorAll("a[href]")];
        const nameless = links
          .filter((a) => a.getAttribute("aria-hidden") !== "true" || a.tabIndex >= 0)
          .filter((a) => !nameOf(a))
          .map((a) => a.getAttribute("href"));
        const hiddenLinks = links
          .filter((a) => a.getAttribute("aria-hidden") === "true")
          .map((a) => a.getAttribute("href"));
        const nested = [...document.querySelectorAll("a a, a button, button a")].length;

        return {
          height: document.documentElement.scrollHeight,
          h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.replace(/\s+/g, " ").trim()),
          links: links.length,
          namelessLinks: nameless,
          ariaHiddenLinks: hiddenLinks,
          nestedInteractive: nested,
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          robots: document.querySelector('meta[name="robots"]')?.content ?? null,
        };
      });

      measurements.push({ route: name, locale, device, pathname, ...stats });
      await page.screenshot({
        path: `${OUT}/${name}-${locale}-${device}.png`,
        fullPage: true,
      });
    }
  }

  await context.close();
}

await browser.close();
await mkdir(OUT, { recursive: true });
await writeFile(`${OUT}/measurements.json`, JSON.stringify(measurements, null, 2));

console.log("route".padEnd(20), "loc dev      height  links  nameless  nested  overflow  h1");
for (const m of measurements) {
  console.log(
    m.route.padEnd(20),
    m.locale,
    m.device.padEnd(8),
    String(m.height).padStart(6),
    String(m.links).padStart(5),
    String(m.namelessLinks.length).padStart(8),
    String(m.nestedInteractive).padStart(6),
    String(m.horizontalOverflow).padStart(8),
    String(m.h1.length),
  );
}
