// @ts-check
import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/johnDoe.json' });

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
    ['Congés', '/app/people/leave_requests'],
    ['Éléments de paie', '/app/people/payroll_elements'],
    ['Tickets resto', '/app/people/meal_tickets'],
    ['Coopérateur·ices et salarié·es', '/app/people/users']
  ]);
});

test('nav current page', async ({ page }) => {
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

test('header nav', async ({ page }) => {
  await page.goto('/app');

  const accountLink = page.getByRole('link', { name: 'Mon compte' });
  await expect(accountLink).not.toBeVisible();
  const logoutButton = page.getByRole('button', { name: 'Se déconnecter' });
  await expect(logoutButton).not.toBeVisible();

  await page.getByRole('group', { name: "Voir plus d'actions" }).click();
  await accountLink.click();
  await page.getByRole('heading', { level: 1, name: 'Mon compte' }).waitFor();

  await page.getByRole('group', { name: "Voir plus d'actions" }).click();
  await logoutButton.click();
  await page.waitForURL('/login');
});
