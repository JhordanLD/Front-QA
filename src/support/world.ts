import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage.js";

export interface ICustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  loginPage?: LoginPage;
  inventoryPage?: InventoryPage;
  cartPage?: CartPage;
  checkoutStepOnePage?: CheckoutStepOnePage;
  checkoutStepTwoPage?: CheckoutStepTwoPage;
  checkoutCompletePage?: CheckoutCompletePage;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
