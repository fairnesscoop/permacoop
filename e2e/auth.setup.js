// @ts-check
import { test } from '@playwright/test';

const authFile = 'playwright/.auth/johnDoe.json';

test('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.fill("input[name='email']", 'john@doe.com');
  await page.fill("input[name='password']", 'john');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/app');
  await page.context().storageState({ path: authFile });
});
