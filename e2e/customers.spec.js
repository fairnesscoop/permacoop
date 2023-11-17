// @ts-check
import { test, expect } from '@playwright/test';
import { expectTableContent } from './util';

test('auth required', async ({ page }) => {
  await page.goto('/app/customers');
  await page.waitForURL(url => url.pathname.startsWith('/login'));
});

test.describe('authenticated', () => {
  test.use({ storageState: 'playwright/.auth/johnDoe.json' });

  test('page content', async ({ page }) => {
    await page.goto('/app/customers');

    await expect(page).toHaveTitle('Clients - Permacoop');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Clients');
  });

  test('table content', async ({ page }) => {
    await page.goto('/app/customers');

    await expectTableContent(
      expect,
      page.getByRole('table', { name: 'Liste des clients' }),
      ['NOM DU CLIENT', 'ACTIONS'],
      [['Aperture Science', '']]
    );
  });

  test('navigate to add customer', async ({ page }) => {
    await page.goto('/app/customers');

    await page.getByRole('button', { name: 'Ajouter' }).click();
    await page.waitForURL('/app/customers/add');
  });
});
