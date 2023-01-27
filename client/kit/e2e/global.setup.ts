import { expect, firefox, type FullConfig, type Browser } from "@playwright/test";

import { STATE_AUTHENTICATED } from "./constants.js";

export default async function globalSetup(config: FullConfig): Promise<void> {
  const browser = await firefox.launch({
    headless: true,
  });

  await saveAuthenticatedState(browser, config, "john@doe.com", "john", STATE_AUTHENTICATED);

  await browser.close();
}

async function saveAuthenticatedState(
  browser: Browser,
  config: FullConfig,
  email: string,
  password: string,
  path: string
) {
  const page = await browser.newPage({
    baseURL: config.projects[0].use.baseURL,
  });
  await page.goto("/kit/login");

  await page.getByLabel("Adresse email").fill(email);
  await page.getByLabel("Mot de passe").fill(password);
  await page.getByText("Se connecter").click();

  const response = await page.waitForResponse("**/api/login");
  expect(response.status()).toBe(201);

  await page.context().storageState({ path });

  await page.close();
}
