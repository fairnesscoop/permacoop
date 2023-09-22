// @ts-check
import { test, expect } from '@playwright/test';

test('redirects to login', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('/login');
});

test('logs in', async ({ page }) => {
  await page.goto('/login');

  const emailField = page.getByRole('textbox', { name: 'Adresse email' });
  await expect(emailField).toHaveAttribute('type', 'email');
  await emailField.fill('john@doe.com');

  const passwordField = page.getByRole('textbox', { name: 'Mot de passe' });
  await expect(passwordField).toHaveAttribute('type', 'password');
  await passwordField.fill('john');

  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page
    .getByRole('heading', { level: 1, name: 'Bonjour, John Doe !' })
    .waitFor();
});
