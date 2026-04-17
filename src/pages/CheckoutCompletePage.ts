import { Locator, Page, expect } from "@playwright/test";

export class CheckoutCompletePage {
  private readonly completeHeader: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async validateOrderSuccess() {
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}
