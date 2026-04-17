# 🎭 Playwright + Cucumber Automation Test Suite

[![Playwright](https://img.shields.io/badge/Playwright-^1.59.1-2EAD33?logo=playwright)](https://playwright.dev)
[![Cucumber](https://img.shields.io/badge/Cucumber-^12.8.1-23D96C?logo=cucumber)](https://cucumber.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-^6.0.2-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?logo=node.js)](https://nodejs.org)

Una suite de pruebas end-to-end profesional basada en **Behavior Driven Development (BDD)** para automatización de pruebas web usando Playwright y Cucumber.

> [!IMPORTANT]
> Este proyecto implementa **un framework** para QA automation: Page Object Model, BDD con Gherkin, data-driven testing y reportes automáticos.

## Requisitos

- **Node.js** v18+
- **npm** v9+

Verifica:

```bash
node --version
npm --version
```

## Instalación

```bash
cd Front-QA
```

```bash
npm install
```

## Ejecutar Tests

### Ejecutar todos los tests (headless)

```bash
npm test
```

### Ver ejecución en tiempo real

```bash
npm run test:headed
```

### Ejecutar y abrir reporte

```bash
npm run test:report
```

### Abrir último reporte

```bash
npm run open:report
```

## Estructura del Proyecto

```
src/
├── pages/              # Page Object Model
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── ...
├── test/
│   ├── features/       # Escenarios Gherkin
│   │   ├── login.feature
│   │   ├── cart.feature
│   │   └── checkout.feature
│   ├── step-definitions/  # Implementación de steps
│   │   ├── loginSteps.spec.ts
│   │   ├── cartSteps.spec.ts
│   │   └── checkoutSteps.spec.ts
│   └── data/           # Datos de prueba
│       ├── users.json
│       └── products.json
├── models/             # Tipos TypeScript
│   ├── user.model.ts
│   └── product.model.ts
├── support/
│   └── world.ts        # Configuración Cucumber
└── hooks/
    └── hook.ts         # Setup/Teardown

config/
└── cucumber.json       # Configuración Cucumber

reports/
└── cucumber-report.html  # Reporte generado
```

## Patrones Usados

**Page Object Model**: Cada página web tiene una clase que encapsula sus elementos y acciones.

**BDD con Gherkin**: Los escenarios se escriben en lenguaje natural (Given/When/Then) y se traducen a código.

**Data-Driven Testing**: Los datos de prueba se separan del código en archivos JSON.


## Revision de Reportes

Los reportes se generan automáticamente en `reports/cucumber-report.html`.

Abre el último reporte con:

```bash
npm run open:report
```

## Reporte de Hallazgos

#### 🔴 Críticos

| Hallazgo                  | Descripción                                                                                                                           | Impacto                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Broken Access Control** | Es posible navegar a `checkout-step-two.html` y `checkout-complete.html` directamente desde la URL sin completar el formulario previo | Flujo de datos incompleto, pedidos sin información del cliente |
| **Error 503**             | Acceder a `inventory-item.html?id=7` genera error 503 Service Unavailable                                                             | Algunos productos no son accesibles                            |
| **Carrito sin reset**     | Si se salta el formulario y se presiona "Back Home" en checkout-complete, el carrito no se limpia                                     | Inconsistencia en estado de la sesión                          |

#### 🟡 Menores

| Hallazgo                   | Descripción                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| **Sin validación cliente** | Los campos (firstName, lastName, postalCode) en checkout-step-one no se validan antes de enviar |
| **Sin resumen de datos**   | En checkout-step-two no se muestra la información del formulario ingresado (nombre, dirección)  |

### 📋 Próximos Pasos de Automatización

- [ ] Validar que no se pueda acceder a los endpoints de checkout sin llenar el formulario
- [ ] Automatizar prueba del error 503 en product id=7
- [ ] Verificar que el carrito se limpie correctamente al presionar "Back Home"
- [ ] Automatizar validación de campos del formulario


---

**Stack**: Playwright, Cucumber.js, TypeScript, Node.js
