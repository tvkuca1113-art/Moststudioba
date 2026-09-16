import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); else console.log("  ok:", m); };

const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 950 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await ctx.newPage();
page.on("pageerror", (e) => fails.push("pageerror: " + e.message));

// ---- document structure ----------------------------------------------------
console.log("struktura dokumenta");
for (const route of ["/", "/projekti", "/projekti/ordinacija-lipa", "/usluge", "/kontakt", "/demo/stolarija-hrast"]) {
  await page.goto(BASE + route, { waitUntil: "load" });
  const h1s = await page.locator("h1").count();
  ok(h1s === 1, `${route}: točno jedan <h1> (${h1s})`);
  const dupes = await page.evaluate(() => {
    const seen = new Map();
    for (const el of document.querySelectorAll("[id]")) seen.set(el.id, (seen.get(el.id) ?? 0) + 1);
    return [...seen.entries()].filter(([, n]) => n > 1).map(([id]) => id);
  });
  ok(dupes.length === 0, `${route}: nema dupliranih id-jeva ${JSON.stringify(dupes)}`);
}

// ---- portfolio -------------------------------------------------------------
console.log("portfolio");
await page.goto(BASE + "/", { waitUntil: "load" });
// next/image rewrites src to /_next/image?url=…, so match the decoded form.
const shotCount = await page.evaluate(
  () => Array.from(document.images).filter((i) => decodeURIComponent(i.src).includes("/images/snimci/")).length,
);
ok(shotCount >= 3, `početna prikazuje snimke stvarnih demoa (${shotCount})`);
ok(
  (await page.locator('main a[href="/demo/ordinacija-lipa"]').count()) > 0 &&
    (await page.locator('main a[href="/projekti/ordinacija-lipa"]').count()) > 0,
  "kartica ima zasebne veze: projekt i demo",
);
const embedded = await page.locator("main [data-demo-embed]").count();
ok(embedded === 0, "početna ne ugrađuje živi demo");

// ---- clinic: reason for visiting -------------------------------------------
console.log("Lipa — izbor razloga dolaska");
await page.goto(BASE + "/demo/ordinacija-lipa", { waitUntil: "load" });
const before = await page.locator('[aria-live="polite"]').first().innerText();
await page.getByText("Krvare mi desni", { exact: true }).click();
await page.waitForTimeout(350);
const after = await page.locator('[aria-live="polite"]').first().innerText();
ok(before !== after, "izbor mijenja uslugu, trajanje i sadržaj");
ok(after.includes("Čišćenje") || after.includes("desni"), "prikazana je odgovarajuća usluga");

// ---- trades: material selector ---------------------------------------------
console.log("Hrast — izbor materijala");
await page.goto(BASE + "/demo/stolarija-hrast", { waitUntil: "load" });
const sampleBefore = await page.locator('main img[src*="hrast-materijal"]').first().getAttribute("src");
const panelBefore = await page.locator('[role="tabpanel"]').first().innerText();
await page.getByRole("tab", { name: /Orah/ }).click();
await page.waitForTimeout(500);
const sampleAfter = await page.locator('main img[src*="hrast-materijal"]').first().getAttribute("src");
const panelAfter = await page.locator('[role="tabpanel"]').first().innerText();
ok(sampleBefore !== sampleAfter, "uzorak materijala se stvarno mijenja");
ok(panelBefore !== panelAfter, "opis prati odabrani materijal");
ok(
  (await page.getByRole("tab", { name: /Orah/ }).getAttribute("aria-selected")) === "true",
  "aktivno stanje je označeno",
);
await page.getByRole("tab", { name: /Hrast, uljeni/ }).focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(300);
ok(
  (await page.getByRole("tab", { name: /Orah/ }).getAttribute("aria-selected")) === "true",
  "strelice pomjeraju izbor materijala",
);

// ---- advisory: questionnaire + reset ---------------------------------------
console.log("Meridijan — upitnik");
await page.goto(BASE + "/demo/meridijan-savjetovanje", { waitUntil: "load" });
for (const answer of ["Promet raste, ali ne vidim zaradu.", "Jasan mjesečni pregled troškova.", "Računi, ponude i naplata."]) {
  await page.getByText(answer, { exact: true }).click();
}
await page.waitForTimeout(400);
ok(await page.getByText("Finansijski pregled").first().isVisible(), "tri odgovora daju prijedlog područja");
await page.getByRole("button", { name: /Počni ispočetka/ }).click();
await page.waitForTimeout(300);
ok(
  await page.getByText(/Odgovorite na sva tri pitanja/).isVisible(),
  "reset vraća upitnik na početak",
);

// ---- brief builder ---------------------------------------------------------
console.log("priprema upita");
await page.goto(BASE + "/kontakt", { waitUntil: "load" });
await page.getByLabel(/Čime se bavite/).fill("stolarija u Tuzli");
await page.getByText("Nova stranica", { exact: true }).click();
await page.getByText("Da nam se javi", { exact: true }).click();
await page.waitForTimeout(300);
let message = await page.locator("textarea").inputValue();
ok(message.includes("stolarija u Tuzli"), "poruka se sastavlja iz odgovora");

await page.locator("textarea").fill("Moj vlastiti tekst poruke.");
await page.getByText("Da zakaže termin", { exact: true }).click();
await page.waitForTimeout(350);
ok(
  (await page.locator("textarea").inputValue()) === "Moj vlastiti tekst poruke.",
  "ručna izmjena poruke se ne gubi pri promjeni izbora",
);
ok(
  await page.getByText(/više ne prati odgovore/).isVisible(),
  "korisnik je upozoren da poruka više ne prati odgovore",
);
await page.getByRole("button", { name: /Sastavi ponovo/ }).click();
await page.waitForTimeout(300);
ok((await page.locator("textarea").inputValue()).includes("zakaže termin"), "ponovno sastavljanje radi");

await page.getByRole("button", { name: /Kopiraj poruku/ }).click();
await page.waitForTimeout(400);
const clip = await page.evaluate(() => navigator.clipboard.readText());
ok(clip.includes("stolarija u Tuzli"), "kopiranje stavlja poruku na clipboard");
ok(
  await page.getByText(/Kopiranje poruke nije isto što i poslan upit/).isVisible(),
  "jasno je da kopiranje nije slanje",
);

// ---- language --------------------------------------------------------------
console.log("jezici");
await page.goto(BASE + "/projekti/stolarija-hrast", { waitUntil: "load" });
await page.getByRole("banner").getByRole("link", { name: "Deutsch" }).click();
await page.waitForURL("**/de/projekte/stolarija-hrast");
ok(page.url().endsWith("/de/projekte/stolarija-hrast"), "prebacivanje jezika čuva isti projekat");
ok((await page.locator("html").getAttribute("lang")) === "de", "njemačko stablo ima lang=de");
ok(
  await page.evaluate(
    () => Array.from(document.images).some((i) => decodeURIComponent(i.src).includes("-de-desktop")),
  ),
  "njemačka stranica pokazuje njemački snimak",
);

// ---- anchors under the sticky header ---------------------------------------
console.log("sidra i ljepljivi header");
await page.goto(BASE + "/demo/ordinacija-lipa", { waitUntil: "load" });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
const target = await page.locator('main a[href^="#"]').first().getAttribute("href");
await page.locator(`main a[href="${target}"]`).first().click();
await page.waitForTimeout(600);
const covered = await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const top = el.getBoundingClientRect().top;
  return top >= -2;
}, target);
ok(covered === true, `cilj sidra nije prekriven (${target})`);

// ---- keyboard + reduced motion ---------------------------------------------
console.log("tastatura i smanjeno kretanje");
await page.goto(BASE + "/", { waitUntil: "load" });
await page.keyboard.press("Tab");
const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
ok(/Pređi na sadržaj/.test(first ?? ""), `skip-link je prvi u redu (${first})`);
ok(
  (await page.evaluate(() => getComputedStyle(document.activeElement).outlineWidth)) !== "0px",
  "fokus je vidljiv",
);

const rm = await browser.newContext({ viewport: { width: 1440, height: 950 }, reducedMotion: "reduce" });
const rmPage = await rm.newPage();
await rmPage.goto(BASE + "/", { waitUntil: "load" });
await rmPage.waitForTimeout(600);
const hiddenOpacity = await rmPage.evaluate(() => {
  const el = document.querySelector('[data-reveal="pending"]');
  return el ? getComputedStyle(el).opacity : "1";
});
ok(hiddenOpacity === "1", `ništa nije skriveno uz reduced-motion (${hiddenOpacity})`);
await rm.close();

await browser.close();
console.log(fails.length ? "\nGREŠKE:\n" + fails.join("\n") : "\nSVE INTERAKCIJE PROLAZE");
