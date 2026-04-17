Feature: Autenticación de Usuarios

  Background:
    Given el usuario navega a la página de inicio

  @login @security
  Scenario: Bloquear acceso forzado a páginas internas
    When el usuario intenta navegar directamente al endpoint "<endpoint>"
    Then el mensaje de error para "<perfil>" debe ser "<mensaje>"

    Examples:
      | perfil | endpoint           | mensaje                                              |
       | none_forced | inventory.html           | Epic sadface: You can only access '/inventory.html' when you are logged in. |

  @login @smoke @happy-path
  Scenario: Inicio de sesión exitoso
    When ingresa con el perfil de usuario "standard"
    And hace clic en el botón de login
    Then debe ser redirigido a la página de productos

  @login @regression @negative
  Scenario Outline: Validar errores de credenciales en el formulario
    When ingresa con el perfil de usuario "<perfil>"
    And hace clic en el botón de login
    Then el mensaje de error para "<perfil>" debe ser "<mensaje>"

    Examples:
      | perfil           | mensaje                                              |
      | locked           | Epic sadface: Sorry, this user has been locked out. |
      | standard_no_user | Epic sadface: Username is required                  |
      | standard_no_pass | Epic sadface: Password is required                  |
      | invalid_user     | Epic sadface: Username and password do not match any user in this service |

  