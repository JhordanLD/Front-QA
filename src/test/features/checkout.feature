Feature: Proceso de Checkout y Finalización de Compra

  Background:
  Given el usuario está autenticado y en la página de productos
    And el usuario tiene productos en el carrito
    And el usuario está en la página de carrito

  @smoke @checkout
  Scenario: Flujo de compra exitoso y limpieza de carrito
    When el usuario completa el checkout con datos válidos
    And hace clic en finalizar compra
    Then debe ver el mensaje de agradecimiento "Thank you for your order!"
    And al volver al inicio el carrito debe estar vacío
  @regression @negative @checkout
  Scenario Outline: Validar campos obligatorios en información de envío
    Given el usuario navega a "checkout-step-one.html"
    When intenta continuar con: "<nombre>", "<apellido>", "<zip>"
    Then el mensaje de error de checkout debe ser "<error>"

    Examples:
      | nombre | apellido | zip  | error                        |
      |        | Lopez    | 123  | First Name is required       |
      | Jhon   |          | 123  | Last Name is required        |
      | Jhon   | Lopez    |      | Postal Code is required      |

  @security @boundary
  Scenario: Bloquear saltos ilegales entre etapas del checkout
    When el usuario intenta navegar directamente a "checkout-step-two.html"
    Then el sistema debería redirigirlo a "checkout-step-one.html" 