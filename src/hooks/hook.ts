import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";

Before(async function () {
  const isHeadless = process.env.HEADLESS !== "false";

  this.browser = await chromium.launch({ headless: isHeadless });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.inventoryPage = new InventoryPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutStepOne = new CheckoutStepOnePage(this.page);
  this.checkoutStepTwo = new CheckoutStepTwoPage(this.page);
  this.checkoutComplete = new CheckoutCompletePage(this.page);
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
