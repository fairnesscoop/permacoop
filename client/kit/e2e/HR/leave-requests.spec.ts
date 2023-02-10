import { test, expect } from "@playwright/test";
import { LoginPage } from "../fixtures/LoginPage.js";

test("should see leave request page ", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
  await page.getByRole("link", { name: "Congés" }).click();
  await expect(page).toHaveURL("/kit/human_resources/leaves");
});
