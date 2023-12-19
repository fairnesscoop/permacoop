// @ts-check
import { test, expect } from '@playwright/test';

test('auth required', async ({ page }) => {
  await page.goto('/app/faircalendar');
  await page.waitForURL(url => url.pathname.startsWith('/login'));
});

test.describe('authenticated', () => {
  test.use({ storageState: 'playwright/.auth/johnDoe.json' });

  test('basic content', async ({ page }) => {
    await page.goto('/app/faircalendar?year=2023&month=11'); // month=1..12
    await expect(page).toHaveTitle('FairCalendar novembre 2023 - Permacoop');

    const calendar = page.getByTestId('pc-event-calendar');
    await expect(calendar).toBeVisible();

    const toussaint = calendar.getByText('7h - Jour férié');
    await expect(toussaint).toBeVisible();
  });

  test('go to add event', async ({ page }) => {
    await page.goto('/app/faircalendar?year=2023&month=11');

    const calendar = page.getByTestId('pc-event-calendar');

    await calendar
      .locator('.ec-body .ec-day')
      .nth(8)
      .click();

    await page.waitForURL(
      '/app/faircalendar/events/add/2023-11-09--2023-11-09'
    );
  });

  test('back button behavior', async ({ page }) => {
    await page.goto('/app/faircalendar?year=2023&month=11');

    const calendar = page.getByTestId('pc-event-calendar');

    // Ensure rendered calendar is present
    expect(await calendar.locator('.ec').count()).toBe(1);

    await page.goto('/app');
    await page.goBack();

    // Regression test: ensure calendar is rendered without duplication and that it is interactive
    expect(await calendar.locator('.ec').count()).toBe(1);
    await calendar
      .locator('.ec-body .ec-day')
      .nth(8)
      .click();
    await page.waitForURL(
      '/app/faircalendar/events/add/2023-11-09--2023-11-09'
    );
  });
});
