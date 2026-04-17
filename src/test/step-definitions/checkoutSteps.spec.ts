import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import products from "../data/products.json" with { type: "json" };
import users from "../data/users.json" with { type: "json" };

const getProduct = (key: string) => {
  const data = (products as any)[key];
  if (!data)
    throw new Error(
      `[Data Error]: El producto "${key}" no existe en products.json`,
    );
  return data;
};

const getUser = (key: string) => {
  const data = (users as any)[key];
  if (!data)
    throw new Error(`[Data Error]: El perfil "${key}" no existe en users.json`);
  return data;
};

Given(
  "el usuario está autenticado y en la página de productos",
  async function () {
    const { user, pass } = getUser("standard");

    await this.loginPage.navigateTo();
    await this.loginPage.loginWithCredentials(user, pass);
    await this.loginPage.clickOnLogin();
    await this.loginPage.checkSuccessfulLogin();
  },
);

Given("el usuario tiene productos en el carrito", async function () {
  const { slug } = getProduct("backpack");
  await this.inventoryPage.addItemToCart(slug);
});

Given("el usuario está en la página de carrito", async function () {
  await this.inventoryPage.openCart();
});

When("el usuario completa el checkout con datos válidos", async function () {
  await this.cartPage.clickCheckout();

  await this.checkoutStepOne.fillInformation("Jhordan", "Lopez", "07001");

  await this.checkoutStepTwo.verifyPriceLogic();
});

When("hace clic en finalizar compra", async function () {
  await this.checkoutStepTwo.clickFinish();
});

Then(
  "debe ver el mensaje de agradecimiento {string}",
  async function (mensaje: string) {
    await this.checkoutComplete.validateOrderSuccess();
  },
);

Then("al volver al inicio el carrito debe estar vacío", async function () {
  await this.checkoutComplete.clickBackHome();
  await this.inventoryPage.checkCartCount("0");
});

Given("el usuario navega a {string}", async function (url: string) {
  await this.loginPage.navigateToEndpoint(url);
});

When(
  "intenta continuar con: {string}, {string}, {string}",
  async function (nombre: string, apellido: string, zip: string) {
    await this.checkoutStepOne.fillInformation(nombre, apellido, zip);
  },
);

Then(
  "el mensaje de error de checkout debe ser {string}",
  async function (mensaje: string) {
    await this.checkoutStepOne.validateErrorMessage(mensaje);
  },
);

When(
  "el usuario intenta navegar directamente a {string}",
  async function (endpoint: string) {
    await this.loginPage.navigateToEndpoint(endpoint);
  },
);

Then(
  "el sistema debería redirigirlo a {string}",
  async function (expectedUrl: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedUrl), {
      timeout: 10000,
    });
  },
);
