import { expect, test } from "@playwright/test";

test("/ redirects to /kit/login", async ({ page }) => {
  await page.goto("/");
  await page.waitForURL("/kit/login");
});

test("/login redirects to /kit/login", async ({ page }) => {
  await page.goto("/");
  await page.waitForURL("/kit/login");
});

test("Login page has expected h1", async ({ page }) => {
  await page.goto("/kit/login");
  expect(await page.textContent("h1")).toBe("Connexion");
});

test("Logs in using form", async ({ page }) => {
  await page.goto("/kit/login");

  const emailField = page.getByLabel("Adresse email");
  expect(emailField).toHaveAttribute("required", "");
  await emailField.fill("john@doe.com");

  const passwordField = page.getByLabel("Mot de passe");
  expect(passwordField).toHaveAttribute("required", "");
  await passwordField.fill("john");

  const loginButton = page.getByText("Se connecter");
  await loginButton.click();

  await page.getByText("Bonjour John Doe !").waitFor();
  expect(page).toHaveURL("/");
});
