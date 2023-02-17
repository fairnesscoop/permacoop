import { test } from "./fixtures.js";
import { expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage.js";

test.describe("accessibilty - pages without required authentication", () => {
  test("home page should not have any automatically detectable accessibility issues", async ({
    page,
    makeAxeBuilder,
  }) => {
    await new LoginPage(page).login();

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
