import { Locator, Page, expect } from "@playwright/test";

export class CheckoutStepTwoPage {
  private readonly finishButton: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;

  constructor(private page: Page) {
    this.finishButton = page.locator('[data-test="finish"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async verifyPriceLogic() {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);

    const subtotal = await this.parsePrice(this.subtotalLabel);
    const tax = await this.parsePrice(this.taxLabel);
    const total = await this.parsePrice(this.totalLabel);

    expect(subtotal + tax).toBeCloseTo(total, 2);
  }

  private async parsePrice(locator: Locator): Promise<number> {
    const text = await locator.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ""));
  }
}
