// @ts-check
import { test, expect } from '@playwright/test';

test('auth required', async ({ page }) => {
  await page.goto('/app');
  await page.waitForURL(url => url.pathname.startsWith('/login'));
});

test.describe('authenticated', () => {
  test.use({ storageState: 'playwright/.auth/johnDoe.json' });

  test('redirects from index', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('/app');
  });

  test('home content', async ({ page }) => {
    await page.goto('/app');

    await expect(page).toHaveTitle('Bonjour, John Doe ! - Permacoop');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Bonjour, John Doe !'
    );
  });

  test('navigate to leave requests', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Voir les demandes de congés' })
      .click();
    await page.waitForURL('/app/people/leave_requests');
  });
});
