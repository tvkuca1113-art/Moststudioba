import { chromium } from "@playwright/test";
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); else console.log("  ok:", m); };
const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });

for (const slug of ["ordinacija-lipa", "stolarija-hrast", "meridijan-savjetovanje"]) {
  const page = await ctx.newPage();
  page.on("pageerror", (e) => fails.push(`${slug}: ${e.message}`));
  await page.goto(`${BASE}/demo/${slug}`, { waitUntil: "networkidle" });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });

  // Nothing that looks like a control may be a bare inert element.
  const inert = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll("main span, main div")) {
      if (el.children.length > 2) continue;
      const text = (el.textContent || "").trim();
      if (!text || text.length > 40) continue;
      const cs = getComputedStyle(el);
      const looksLikeControl =
        (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderTopWidth !== "0px") &&
        parseFloat(cs.minHeight) >= 44 &&
        cs.display.includes("flex");
      if (looksLikeControl && !el.closest("a, button")) bad.push(text.slice(0, 40));
    }
    return bad;
  });
  ok(inert.length === 0, `${slug}: no inert look-alike controls ${JSON.stringify(inert)}`);

  const before = await page.evaluate(() => window.scrollY);
  const navLink = page.locator("main a[href^='#']").first();
  if (await navLink.count()) {
    await navLink.click();
    await page.waitForTimeout(700);
    const after = await page.evaluate(() => window.scrollY);
    ok(after > before, `${slug}: in-demo nav link scrolls to its section (${before} → ${after})`);
  }

  const action = page.locator("button[aria-expanded]").last();
  await action.scrollIntoViewIfNeeded();
  ok((await action.getAttribute("aria-expanded")) === "false", `${slug}: action starts collapsed`);
  await action.click();
  await page.waitForTimeout(300);
  ok((await action.getAttribute("aria-expanded")) === "true", `${slug}: action opens the demo notice`);
  const noticeId = await action.getAttribute("aria-controls");
  ok(await page.locator(`#${noticeId}`).isVisible(), `${slug}: notice is shown instead of a fake submission`);
  await page.close();
}

// Duplicate-id check: the case page renders the same demo twice.
const page = await ctx.newPage();
await page.goto(`${BASE}/projekti/stolarija-hrast`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const dupes = await page.evaluate(() => {
  const seen = new Map();
  for (const el of document.querySelectorAll("[id]")) seen.set(el.id, (seen.get(el.id) ?? 0) + 1);
  return [...seen.entries()].filter(([, n]) => n > 1).map(([id, n]) => `${id} ×${n}`);
});
ok(dupes.length === 0, `case page has no duplicate ids ${JSON.stringify(dupes)}`);
await browser.close();
console.log(fails.length ? "\nFAILURES:\n" + fails.join("\n") : "\nALL CLICKABLE CHECKS PASSED");
