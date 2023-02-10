import { expect, test } from "@playwright/test";
import { LoginPage } from "./fixtures/LoginPage.js";

test("Login page has expected h1", async ({ page }) => {
  await page.goto("/kit/login");
  expect(await page.textContent("h1")).toBe("Connexion");
});

test("Logs in using form", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login();
});
