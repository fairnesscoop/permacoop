import { expect, test } from "@playwright/test";
import { STATE_AUTHENTICATED } from "./constants.js";

test.use({ storageState: STATE_AUTHENTICATED });

test("Visits pages listed in nav", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Tableau de bord" }).click();
  await page.waitForURL("/kit");

  await page.getByRole("link", { name: "FairCalendar" }).click();
  await page.waitForURL("/faircalendar");

  await page.getByRole("link", { name: "Projets" }).click();
  await page.waitForURL("/crm/projects");

  await page.getByRole("link", { name: "Clients" }).click();
  await page.waitForURL("/crm/customers");

  await page.getByRole("link", { name: "Contacts" }).click();
  await page.waitForURL("/crm/contacts");

  await page.getByRole("link", { name: "Factures" }).click();
  await page.waitForURL("/accounting/invoices");

  await page.getByRole("link", { name: "Devis" }).click();
  await page.waitForURL("/accounting/quotes");

  await page.getByRole("link", { name: "Missions" }).click();
  await page.waitForURL("/accounting/tasks");

  await page.getByRole("link", { name: "TJM" }).click();
  await page.waitForURL("/accounting/daily_rates");

  await page.getByRole("link", { name: "Congés" }).click();
  await page.waitForURL("/human_resources/leaves");

  await page.getByRole("link", { name: "Fiches de paies" }).click();
  await page.waitForURL("/human_resources/payslips");

  await page.getByRole("link", { name: "Tickets restaurant" }).click();
  await page.waitForURL("/human_resources/meal_tickets");

  await page.getByRole("link", { name: "Épargne salariale" }).click();
  await page.waitForURL("/human_resources/savings_records");

  await page.getByRole("link", { name: "Coopérateurs - salariés" }).click();
  await page.waitForURL("/human_resources/users");
});

test("Fills the search bar", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Rechercher").fill("Test");
  expect(page.getByLabel("Rechercher")).toHaveValue("Test");
});

test.describe("Account settings", () => {
  test("Opens and closes the account settings menu", async ({ page }) => {
    await page.goto("/");

    const button = page.getByRole("button", { name: "Paramètres" });
    await button.waitFor();
    expect(page.getByText("Mon compte")).not.toBeVisible();

    await button.click();
    expect(page.getByText("Mon compte")).toBeVisible();

    // Clicking outside should close the menu
    await page.locator('[data-testid="outside"]').click();
    await expect(page.getByText("Mon compte")).not.toBeVisible();
  });

  test("Visits profile page through header", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Paramètres" }).click();
    await page.getByText("Mon compte").click();
    await page.waitForURL("/profile");
  });
});
