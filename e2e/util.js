// @ts-check

/**
 * @typedef {import('@playwright/test').Locator} Locator
 * @typedef {import('@playwright/test').Expect} Expect
 */

/**
 * @param {Expect} expect
 * @param {Locator}  locator
 * @param {string[]} header
 * @param {any[]} rows
 */
export async function expectTableContent(expect, locator, header, rows) {
  await expect(locator).toBeVisible();

  expect(await locator.locator('> thead > tr > th').allInnerTexts()).toEqual(
    header
  );
  expect(await locator.locator('> tbody > tr').count()).toBe(rows.length);

  for (let i = 0; i < rows.length; i++) {
    expect(
      await locator
        .locator('> tbody > tr')
        .nth(i)
        .locator('> td')
        .allInnerTexts()
    ).toEqual(rows[i]);
  }
}
