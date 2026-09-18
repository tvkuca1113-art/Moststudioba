import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('shop categories scroll within the document at every target width', async ({ page }) => {
  for (const width of [320, 360, 375, 390, 430, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/moststudiowebshop');
    await expect(page.getByRole('button', { name: 'Sve 50', exact: true })).toBeVisible();
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth }));
    expect(dimensions.document).toBe(dimensions.viewport);
  }
});

test('shop home link preserves cart across Back, Forward and reload', async ({ page }) => {
  await page.goto('/moststudiowebshop');
  await page.getByRole('button', { name: 'Bijela pamučna košulja', exact: true }).click();
  await page.getByRole('radio', { name: 'Veličina M', exact: true }).click();
  await page.getByRole('button', { name: 'Dodaj u korpu', exact: true }).click();
  await page.getByRole('button', { name: 'Zatvori korpu', exact: true }).click();
  const home = page.getByRole('link', { name: 'Izradio MOST Studio', exact: true });
  await home.scrollIntoViewIfNeeded();
  await home.click();
  await expect(page).toHaveURL(/\/#top$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.goBack();
  await expect(page.getByRole('button', { name: 'Otvori korpu, 1 artikala', exact: true })).toBeVisible();
  await page.goForward();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.goBack(); await page.reload();
  await expect(page.getByRole('button', { name: 'Otvori korpu, 1 artikala', exact: true })).toBeVisible();
});

test('Hrast download contains the actual selection with UTF-8 BOM', async ({ page }) => {
  await page.goto('/demo/stolarija-hrast');
  await page.getByRole('button', { name: 'Plakar', exact: true }).click();
  await page.getByRole('button', { name: 'Orah, mat lak', exact: true }).click();
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Preuzmi svoj projekt', exact: true }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe('MOST-Hrast-projekt.txt');
  const file = await download.path(); expect(file).toBeTruthy();
  const bytes = await readFile(file!);
  expect(bytes.subarray(0, 3).toString('hex')).toBe('efbbbf');
  expect(bytes.toString('utf8')).toContain('Plakar\nOrah, mat lak\n320 cm');
});

test('mobile menu stays fixed and returns focus after Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const section of ['top', 'projekti', 'kontakt']) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Otvori meni', exact: true }).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await expect(page.locator('main')).toHaveAttribute('inert', '');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Otvori meni', exact: true })).toBeFocused();
  }
});
