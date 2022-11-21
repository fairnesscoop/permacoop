import { expect, test } from "@playwright/test";

test("redirects to kit login", async ({ page }) => {
  await page.goto("/");
  await page.waitForURL("/kit/login");
});

test("login page has expected h1", async ({ page }) => {
  await page.goto("/kit/login");
  expect(await page.textContent("h1")).toBe("Connexion");
});
