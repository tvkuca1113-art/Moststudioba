import { chromium } from "@playwright/test";
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";

// Words that exist in Bosnian copy and never in the German copy.
const bosnianOnly = [
  "Razgovarajmo", "Usluge", "Projekti", "Kako radimo", "Pogledajte", "Isprobajte",
  "Demo koncept", "stranice", "Kopiraj poruku", "Čime se bavite", "Zakažite",
  "Prvi dolazak", "Šta obuhvata", "Cilj ovog koncepta", "Nazad na", "Sljedeći",
  "Kontakt je dostupan", "Odaberite", "Dogovorite mjerenje", "Počni ispočetka",
];

const routes = [
  "/de", "/de/projekte", "/de/projekte/ordinacija-lipa", "/de/projekte/stolarija-hrast",
  "/de/projekte/meridijan-savjetovanje", "/de/leistungen", "/de/kontakt",
  "/de/demo/ordinacija-lipa", "/de/demo/stolarija-hrast", "/de/demo/meridijan-savjetovanje",
];

const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const problems = [];

for (const route of routes) {
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // Open every interactive state so nothing stays unrendered.
  for (const name of ["Warum ist das so gestaltet?", "Mobil"]) {
    const btn = page.getByRole("button", { name });
    if (await btn.count()) await btn.first().click().catch(() => {});
  }
  await page.waitForTimeout(400);
  const text = await page.evaluate(() => document.body.innerText);
  const hits = bosnianOnly.filter((w) => text.includes(w));
  if (hits.length) problems.push(`${route}: ${hits.join(", ")}`);

  const lang = await page.locator("html").getAttribute("lang");
  if (lang !== "de") problems.push(`${route}: html lang is "${lang}"`);
  await page.close();
}

// And the mirror check: no German-only words on the Bosnian pages.
const germanOnly = ["Gespräch starten", "Leistungen", "Ablauf", "Demo-Konzept", "Nachricht kopieren"];
for (const route of ["/", "/usluge", "/kontakt", "/projekti/stolarija-hrast", "/demo/stolarija-hrast"]) {
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const text = await page.evaluate(() => document.body.innerText);
  const hits = germanOnly.filter((w) => text.includes(w));
  if (hits.length) problems.push(`${route}: german leak ${hits.join(", ")}`);
  const lang = await page.locator("html").getAttribute("lang");
  if (lang !== "bs") problems.push(`${route}: html lang is "${lang}"`);
  await page.close();
}

await browser.close();
console.log(problems.length ? "LANGUAGE LEAKS:\n" + problems.join("\n") : "NO LANGUAGE LEAKS — both trees are fully translated");
