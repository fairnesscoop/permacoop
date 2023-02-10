import { expect, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login() {
    await this.goto();

    const emailField = this.page.getByLabel("Adresse email");
    expect(emailField).toHaveAttribute("required", "");
    await emailField.fill("john@doe.com");

    const passwordField = this.page.getByLabel("Mot de passe");
    expect(passwordField).toHaveAttribute("required", "");
    await passwordField.fill("john");

    const loginButton = this.page.getByText("Se connecter");
    await loginButton.click();

    await this.page.waitForURL("/kit");

    await this.page.getByText("Bonjour John Doe !").waitFor();
  }
}
