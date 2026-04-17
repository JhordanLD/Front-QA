import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  private readonly usernameTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly loginButton: Locator;
  private readonly shoppingCartIcon: Locator;
  private readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.usernameTextbox = page.getByRole("textbox", { name: "Username" });
    this.passwordTextbox = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.shoppingCartIcon = page.locator(
      "xpath=//a[contains(@class, 'shopping_cart_link')]",
    );
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateTo() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async navigateToEndpoint(endpoint: string) {
    const newUrl = "https://www.saucedemo.com/" + endpoint;
    await this.page.goto(newUrl);
  }

  async fillUsername(username: string) {
    await this.usernameTextbox.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordTextbox.fill(password);
  }

  async clickOnLogin() {
    await this.loginButton.click();
  }

  async loginWithCredentials(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
  }

  async checkSuccessfulLogin() {
    await expect(this.shoppingCartIcon).toBeVisible();
  }

  async checkErrorMessageVisible(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
