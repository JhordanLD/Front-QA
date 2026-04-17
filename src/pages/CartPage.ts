import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(private page: Page) {
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
  }

  async validateProductIsDisplayed(productName: string) {
    const item = this.page.locator(
      `[data-test="inventory-item-name"]:text-is("${productName}")`,
    );
    await expect(item).toBeVisible();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async verifyNumberOfItems(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }
}
