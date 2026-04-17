import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage {
  private readonly cartBadge: Locator;
  private readonly cartButton: Locator;

  constructor(private page: Page) {
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
  }

  // El método usa el ID exacto que viene del JSON
  async addItemToCart(productSlug: string) {
    const selector = `[data-test="add-to-cart-${productSlug}"]`;
    await this.page.locator(selector).click();
  }

  async removeItem(productSlug: string) {
    const selector = `[data-test="remove-${productSlug}"]`;
    await this.page.locator(selector).click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async getCartBadgeValue() {
    return await this.cartBadge.innerText();
  }

  async checkCartCount(expectedCount: string) {
    if (expectedCount === "0" || expectedCount === "") {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toHaveText(expectedCount);
    }
  }
}
