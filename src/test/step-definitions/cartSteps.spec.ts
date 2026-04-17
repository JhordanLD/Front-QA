import { When, Then } from "@cucumber/cucumber";
import { ProductData, IProducts } from "../../models/product.model.js";
import productsJson from "../data/products.json" with { type: "json" };

const products: IProducts = productsJson;

const getProduct = (key: string): ProductData => {
  const data = products[key];

  if (!data) {
    throw new Error(
      `[DATA ERROR]: La llave "${key}" no existe en products.json. Revisa tu Scenario Outline.`,
    );
  }

  return data;
};

When("el usuario abre el carrito", async function () {
  await this.inventoryPage.openCart();
});

Then(
  "debería haber {string} productos listados",
  async function (cantidadEsperada: string) {
    const esperado = parseInt(cantidadEsperada);

    await this.cartPage.verifyNumberOfItems(esperado);
  },
);

When(
  "agrega el producto {string} al carrito",
  async function (producto: string) {
    const { slug } = getProduct(producto);
    await this.inventoryPage.addItemToCart(slug);
  },
);

When(
  "agrega los productos {string} y {string}",
  async function (p1: string, p2: string) {
    await this.inventoryPage.addItemToCart(getProduct(p1).slug);
    await this.inventoryPage.addItemToCart(getProduct(p2).slug);
  },
);

When(
  "elimina el producto {string} del carrito",
  async function (producto: string) {
    const { slug } = getProduct(producto);
    await this.inventoryPage.removeItem(slug);
  },
);

When(
  "elimina los productos {string} y {string}",
  async function (p1: string, p2: string) {
    await this.inventoryPage.removeItem(getProduct(p1).slug);
    await this.inventoryPage.removeItem(getProduct(p2).slug);
  },
);

Then(
  "el icono del carrito debe mostrar {string}",
  async function (cantidad: string) {
    await this.inventoryPage.checkCartCount(cantidad);
  },
);

Then(
  "el icono del carrito debería mostrar la cantidad de {string}",
  async function (cantidad: string) {
    await this.inventoryPage.checkCartCount(cantidad);
  },
);

Then(
  "el icono del carrito no debería mostrar ninguna cantidad",
  async function () {
    await this.inventoryPage.checkCartCount("0");
  },
);

Then(
  "al abrir el carrito debe aparecer el producto {string}",
  async function (productoKey: string) {
    const { displayName } = getProduct(productoKey);
    await this.inventoryPage.openCart();
    await this.cartPage.validateProductIsDisplayed(displayName);
  },
);

Then("hace clic en el botón de continue shopping", async function () {
  await this.cartPage.clickContinueShopping();
});
