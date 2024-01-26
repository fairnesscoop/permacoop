// @ts-check
import { test, expect } from '@playwright/test';

/** @typedef {import('@playwright/test').Locator} Locator */
/** @typedef {import('@playwright/test').Page} Page */

/**
 * @param {Page} page
 * @returns [Locator, Locator, Locator]
 */
const getFields = page => {
  return [
    page.getByRole('textbox', { name: 'Adresse email' }),
    page.getByRole('textbox', { name: 'Mot de passe' }),
    page.getByRole('button', { name: 'Se connecter' })
  ];
};

test('redirects to login', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('/login');
  await expect(page.locator('[data-testid=form-errors]')).not.toBeVisible();
});

test('logs in', async ({ page }) => {
  await page.goto('/login');

  const [email, password, submit] = getFields(page);

  await expect(email).toHaveAttribute('type', 'email');
  await email.fill('john@doe.com');

  await expect(password).toHaveAttribute('type', 'password');
  await password.fill('john');

  await submit.click();

  await page
    .getByRole('heading', { level: 1, name: 'Bonjour, John Doe !' })
    .waitFor();
});

test('tries in to access authenticated page with login failure', async ({
  page
}) => {
  await page.goto('/app/faircalendar');
  await page.waitForURL('/login?next=/app/faircalendar');

  const [email, password, submit] = getFields(page);

  await email.fill('john@doe.com');
  await password.fill('wrong');
  await submit.click();

  await page.waitForURL('/login?next=/app/faircalendar');
  expect(
    await page.locator('[data-testid=form-errors] p').allInnerTexts()
  ).toEqual([
    'Erreur',
    "L'adresse email ou le mot de passe est incorrect. Veuillez réessayer."
  ]);

  await email.fill('john@doe.com');
  await password.fill('john');
  await submit.click();

  await page.waitForURL('/app/faircalendar');
});
