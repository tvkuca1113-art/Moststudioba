import { chromium } from "@playwright/test";
const OUT = process.env.SHOT_DIR ?? "qa/shots";
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); else console.log("  ok:", msg); };

const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 950 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await ctx.newPage();
page.on("pageerror", (e) => fails.push("pageerror: " + e.message));

// ---------- showcase ----------
console.log("showcase");
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
await page.locator("#sta-mozemo").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);

const panel = page.locator('[role="tabpanel"]').first();
ok(await panel.getByText("Ordinacija Lipa").first().isVisible(), "clinic demo visible by default");

// desktop vs mobile really reflows: the clinic nav is hidden below @3xl
const deskNav = await panel.getByText("Prvi dolazak").first().isVisible();
await page.getByRole("button", { name: "Mobitel" }).click();
await page.waitForTimeout(700);
const mobNav = await panel.getByText("Prvi dolazak").first().isVisible();
ok(deskNav && !mobNav, `device toggle reflows layout (desktop nav ${deskNav}, mobile nav ${mobNav})`);
await page.screenshot({ path: `${OUT}/int-showcase-mobile.png`, clip: { x: 40, y: 0, width: 1360, height: 950 } });

await page.getByRole("button", { name: "Računar" }).click();
await page.waitForTimeout(500);

// concept switching (lazy-loaded chunks)
await page.getByRole("tab", { name: "Stolarija i montaža po mjeri" }).click();
await page.waitForTimeout(1200);
ok(await panel.getByText("Stolarija Hrast").first().isVisible(), "trades concept loads on demand");

// the configurator actually changes the drawing
const before = await panel.innerHTML();
await panel.getByText("Orah, mat lak").click();
await page.waitForTimeout(400);
const after = await panel.innerHTML();
ok(before !== after, "finish change repaints the joinery drawing");

await page.getByRole("tab", { name: "Poslovno savjetovanje" }).click();
await page.waitForTimeout(1200);
ok(await panel.getByText("Meridijan").first().isVisible(), "advisory concept loads on demand");

// reasons toggle
const reasonsBtn = page.getByRole("button", { name: /Zašto je ovako dizajnirano/ });
await reasonsBtn.click();
await page.waitForTimeout(500);
ok(await page.getByRole("heading", { name: "Tri odluke u ovom primjeru" }).isVisible(), "explanations appear");
ok(
  await page.getByText("Ponuda je jasna već na prvom ekranu.").first().isVisible(),
  "explanation 1 present",
);
const markers = await panel.locator("[data-annotation]").count();
ok(markers >= 3, `annotation markers rendered in the demo (${markers})`);
await page.screenshot({ path: `${OUT}/int-showcase-reasons.png` });

// keyboard: arrow keys move between concepts
await page.getByRole("tab", { name: "Stomatološka ordinacija" }).first().focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(800);
const selected = await page.locator('[role="tablist"]').first().locator('[role="tab"][aria-selected="true"]').textContent();
ok(selected?.includes("Stolarija"), `arrow keys move between concepts (now: ${selected})`);

// ---------- brief builder ----------
console.log("brief builder");
await page.goto(BASE + "/kontakt", { waitUntil: "networkidle" });
await page.getByLabel(/Čime se bavite/).fill("stomatološka ordinacija u Sarajevu");
await page.getByText("Redizajn postojeće", { exact: true }).click();
await page.getByText("Da zakaže termin", { exact: true }).click();
await page.getByLabel(/URL postojeće stranice/).fill("www.primjer.ba");
await page.waitForTimeout(300);

const composed = await page.locator("textarea").inputValue();
ok(composed.includes("stomatološka ordinacija u Sarajevu"), "message includes the business");
ok(composed.includes("redizajn postojeće stranice"), "message includes the need");
ok(composed.includes("zakaže termin"), "message includes the goal");
ok(composed.includes("www.primjer.ba"), "message includes the optional url");

await page.getByRole("button", { name: /Kopiraj poruku/ }).click();
await page.waitForTimeout(400);
const clip = await page.evaluate(() => navigator.clipboard.readText());
ok(clip.trim() === composed.trim(), "copy puts the exact message on the clipboard");
ok(
  await page.getByRole("button", { name: "Poruka je kopirana" }).isVisible(),
  "copy confirmation is shown",
);
ok(
  await page.getByText(/Kopiranje poruke nije isto što i poslan upit/).isVisible(),
  "copying is clearly not sending",
);
await page.screenshot({ path: `${OUT}/int-brief.png` });

// validation
await page.getByRole("button", { name: /Počni ispočetka/ }).click();
await page.waitForTimeout(200);
await page.getByRole("button", { name: /Kopiraj poruku/ }).click();
await page.waitForTimeout(300);
ok(await page.getByText("Upišite čime se bavite.").isVisible(), "validation blocks an empty brief");

await page.getByLabel(/Čime se bavite/).fill("stolarija");
await page.getByText("Nova stranica", { exact: true }).click();
await page.getByText("Da nam se javi", { exact: true }).click();
await page.getByLabel(/URL postojeće stranice/).fill("not a url");
await page.getByRole("button", { name: /Kopiraj poruku/ }).click();
await page.waitForTimeout(300);
ok(await page.getByText(/Provjerite adresu/).isVisible(), "invalid url is rejected");

// ---------- language switch keeps the page ----------
console.log("language");
await page.goto(BASE + "/projekti/stolarija-hrast", { waitUntil: "networkidle" });
await page.getByRole("banner").getByRole("link", { name: "Deutsch" }).click();
await page.waitForURL("**/de/projekte/stolarija-hrast");
ok(page.url().endsWith("/de/projekte/stolarija-hrast"), "language switch keeps the same page");
ok((await page.locator("html").getAttribute("lang")) === "de", "german tree sets lang=de");

// ---------- keyboard-only navigation ----------
console.log("keyboard");
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim());
ok(/Pređi na sadržaj/.test(firstFocus ?? ""), `skip link is first in tab order (${firstFocus})`);
const ring = await page.evaluate(() => {
  const el = document.activeElement;
  return el ? getComputedStyle(el).outlineWidth : null;
});
ok(ring !== "0px", `focus ring is visible (${ring})`);

// ---------- reduced motion ----------
console.log("reduced motion");
const rm = await browser.newContext({ viewport: { width: 1440, height: 950 }, reducedMotion: "reduce" });
const rmPage = await rm.newPage();
await rmPage.goto(BASE + "/", { waitUntil: "networkidle" });
await rmPage.waitForTimeout(500);
const heroOpacity = await rmPage.evaluate(() => {
  const plate = document.querySelector(".plate-enter");
  return plate ? getComputedStyle(plate).opacity : null;
});
ok(heroOpacity === "1", `hero plates are final immediately under reduced motion (${heroOpacity})`);
const hidden = await rmPage.evaluate(() => document.querySelectorAll('[data-reveal="pending"]').length);
const hiddenOpacity = await rmPage.evaluate(() => {
  const el = document.querySelector('[data-reveal="pending"]');
  return el ? getComputedStyle(el).opacity : "n/a";
});
ok(hidden === 0 || hiddenOpacity === "1", `no content hidden under reduced motion (${hidden} pending, opacity ${hiddenOpacity})`);
await rmPage.screenshot({ path: `${OUT}/int-reduced-motion.png` });

await browser.close();
console.log(fails.length ? "\nFAILURES:\n" + fails.join("\n") : "\nALL INTERACTION CHECKS PASSED");
