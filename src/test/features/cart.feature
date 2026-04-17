Feature: Gestión del Carrito de Compras

  Background:
    Given el usuario navega a la página de inicio
    When ingresa con el perfil de usuario "standard"
    And hace clic en el botón de login
    Then debe ser redirigido a la página de productos

 @smoke @cart
  Scenario: Validar estado vacío y retorno al inventario
    When el usuario abre el carrito
    Then debería haber "0" productos listados
    And hace clic en el botón de continue shopping
    Then debe ser redirigido a la página de productos

  @regression @cart
  Scenario Outline: Validar ciclo completo de un producto (Add/Remove)
    When agrega el producto "<producto>" al carrito
    Then el icono del carrito debe mostrar "1"
    And al abrir el carrito debe aparecer el producto "<producto>"
    When elimina el producto "<producto>" del carrito
    Then el icono del carrito no debería mostrar ninguna cantidad

    Examples:
      | producto    |
      | backpack    |
      | red-t-shirt |

  @boundary @cart
  Scenario: Validar acumulación de múltiples productos
    When agrega los productos "backpack" y "red-t-shirt"
    Then el icono del carrito debe mostrar "2"
    When el usuario abre el carrito
    Then debería haber "2" productos listados