// @ts-check
import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/johnDoe.json' });

test('redirects from index', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('/app');
});

test('home content', async ({ page }) => {
  await page.goto('/app');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Bonjour, John Doe !'
  );
});

test('page navigation', async ({ page }) => {
  await page.goto('/app');

  const homeLink = page.getByRole('link', { name: 'Tableau de bord' });
  await expect(homeLink).toHaveAttribute('aria-current', 'page');
  await homeLink.click();
  await page.waitForURL('/app');

  const fairCalendarLink = page.getByRole('link', { name: 'FairCalendar' });
  await expect(fairCalendarLink).not.toHaveAttribute('aria-current', 'page');
  await fairCalendarLink.click();
  await page.getByRole('heading', { level: 1, name: 'FairCalendar' }).waitFor();
  await expect(homeLink).not.toHaveAttribute('aria-current', 'page');
  await expect(fairCalendarLink).toHaveAttribute('aria-current', 'page');
});

test('nav links', async ({ page }) => {
  await page.goto('/app');

  const links = await page
    .getByRole('navigation')
    .getByRole('link')
    .evaluateAll(links =>
      links.map(link => [link.textContent?.trim(), link.getAttribute('href')])
    );

  expect(links).toEqual([
    ['Tableau de bord', '/app'],
    ['FairCalendar', '/app/faircalendar'],
    ['Clients', '/app/customers'],
    ['Projets', '/app/projects'],
    ['Missions', '/app/tasks'],
    ['Coopérateur·ices et salarié·es', '/app/people/users']
  ]);
});

test('header actions', async ({ page }) => {
  await page.goto('/app');

  await page.getByRole('link', { name: 'Mon compte' }).click();
  await page.getByRole('heading', { level: 1, name: 'Mon compte' }).waitFor();

  const logoutButton = page.getByRole('button', { name: 'Se déconnecter' });
  await expect(logoutButton).not.toBeVisible();
  await page.getByRole('group', { name: "Voir plus d'actions" }).click();
  await logoutButton.click();
  await page.waitForURL('/login');
});
