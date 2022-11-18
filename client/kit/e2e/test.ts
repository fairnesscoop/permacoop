import { expect, test } from "@playwright/test";

test("welcome page has expected h1", async ({ page }) => {
  await page.goto("/kit/welcome");
  expect(await page.textContent("h1")).toBe("Welcome to SvelteKit");
});
