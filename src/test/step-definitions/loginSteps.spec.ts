import { Given, When, Then } from "@cucumber/cucumber";
import { IUsers } from "../../models/user.model.js";
import usersJson from "../data/users.json" with { type: "json" };

const users: IUsers = usersJson;
type UserProfile = keyof typeof users;

Given("el usuario navega a la página de inicio", async function () {
  await this.loginPage.navigateTo();
});

When(
  "ingresa con el perfil de usuario {string}",
  async function (perfil: string) {
    const userData = users[perfil as UserProfile];
    if (!userData) throw new Error(`Perfil ${perfil} no encontrado.`);

    await this.loginPage.loginWithCredentials(userData.user, userData.pass);
  },
);

When(
  "el usuario intenta navegar directamente al endpoint {string}",
  async function (endpoint: string) {
    await this.loginPage.navigateToEndpoint(endpoint);
  },
);

When("hace clic en el botón de login", async function () {
  await this.loginPage.clickOnLogin();
});

Then("debe ser redirigido a la página de productos", async function () {
  await this.loginPage.checkSuccessfulLogin();
});

Then(
  "el mensaje de error para {string} debe ser {string}",
  async function (perfil: string, mensaje: string) {
    const userData = users[perfil as UserProfile];

    if (!userData) {
      throw new Error(
        `No se encontró data o errores para el perfil: ${perfil}`,
      );
    }

    if (mensaje!) {
      await this.loginPage.checkErrorMessageVisible(userData.expectedError!);
    }
  },
);
