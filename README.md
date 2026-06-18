# 🏪 PuntoÁgil 360 - ERP Modular para Tiendas Locales

> *"De la libreta rayada al dato en tiempo real, sin necesidad de internet de alta velocidad."

## 📖 Introducción (El Problema Real)

En América Latina, más del 60% del comercio minorista está en manos de tiendas de barrio, bodegas y colmados. Estos negocios enfrentan 4 problemas críticos que las grandes cadenas resuelven con software caro (SAP, Oracle), pero que ellos no pueden pagar ni operar:

1. **📉 Pérdida por merma**: Los productos perecederos se vencen en los estantes porque nadie lleva un control riguroso de fechas.
2. **💸 Cartera de morosos**: Llevan las deudas de los clientes ("el fiado") en libretas de papel, perdiendo seguimiento y generando conflictos.
3. **⏳ Tiempo perdido en compras**: Los dueños llaman a 5 proveedores para comparar precios de 20 productos, perdiendo horas valiosas.
4. **🧾 Caos en el cierre de caja**: Al no tener un punto de venta (POS) que funcione sin internet, terminan usando calculadoras y nunca cuadra el arqueo.

## 🚀 La Solución: Un Solo Repositorio, 4 Módulos Integrados

**PuntoÁgil 360** no es 4 programas diferentes. Es un **monolito modular** (una sola base de código) que contiene:

- **Módulo POS (Punto de Venta)**: Funciona 100% offline (sincroniza cuando hay WiFi). Calcula vueltos al instante y obliga a hacer arqueos diarios.
- **Módulo Fiados (Créditos)**: Registra clientes con foto, envía recordatorios automáticos por WhatsApp y genera ranking de morosidad.
- **Módulo Inventario (Caducidades)**: Escanea códigos de barras, aplica método PEPS (Primero en expirar, primero en venderse) y alerta con 3 días de anticipación.
- **Módulo Proveedores (Compras)**: Historial de precios para saber si te están subiendo el costo y sugiere la cantidad a pedir basada en el histórico de ventas.

✨ **La magia de tenerlo todo junto**: Cuando vendes un producto en el POS, el inventario descuenta **el lote que vence primero**. Si el cliente pide "fiado", el módulo de créditos registra la deuda automáticamente. Si el stock baja, el módulo de proveedores sugiere reabastecer. **Todo en una sola transacción**.

---

## 🛠️ Tecnologías Utilizadas (Stack)

| Capa | Tecnología | ¿Por qué? |
| :--- | :--- | :--- |
| **Backend** | NestJS (TypeScript) | Soporte nativo para módulos, inyección de dependencias y eventos internos. |
| **Base de Datos** | PostgreSQL | Una sola DB con esquemas separados (`pos`, `inventory`, `credits`, `procurement`). |
| **Cache / Colas** | Redis + BullMQ | Para manejar el stock caliente y enviar notificaciones en segundo plano. |
| **ORM** | Prisma | Tipado seguro y fácil migración de esquemas. |
| **Infraestructura** | Docker + Docker Compose | Levanta todo (DB, Redis, App) con un solo comando. |
| **Frontend (Futuro)** | React Native / PWA | Pendiente de desarrollo, pero el backend está listo para servir APIs. |

---

## 🧱 Estructura del Proyecto (Modular)

```bash
puntoagil-backend/
├── src/
│   ├── modules/
│   │   ├── pos/               # Módulo de Ventas (Offline-ready)
│   │   ├── credits/           # Módulo de Gestión de Fiados
│   │   ├── inventory/         # Módulo de Inventario y Vencimientos
│   │   ├── procurement/       # Módulo de Proveedores y Compras
│   │   └── dashboard/         # Módulo central para reportes unificados
│   ├── shared/                # Autenticación, Guards, Interceptors
│   └── main.ts
├── prisma/
│   └── schema.prisma          # Definición unificada de todas las tablas
├── docker-compose.yml
├── .env.example
└── package.json
```

---

## ⚙️ Requisitos Previos para Correr el Proyecto

- Node.js (v18 o superior)
- Docker y Docker Compose instalados
- Git

---

## 🐳 Instalación y Ejecución (Solo 3 pasos)

Clona el repositorio y ejecuta los siguientes comandos en la raíz:

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar la base de datos y Redis (Docker)
docker-compose up -d

# 3. Ejecutar migraciones y levantar el servidor en modo desarrollo
npx prisma migrate dev --name init
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`. La documentación de la API (Swagger) estará en `http://localhost:3000/api/docs`.

---

## 📌 Estado del Proyecto

🚧 **En desarrollo activo** - Actualmente estamos en la **Fase 1** (Core de POS + Inventario).

- [x] Configuración inicial del repositorio
- [ ] Definición del esquema de base de datos
- [ ] Endpoints CRUD de Productos y Ventas
- [ ] Módulo de Fiados (Créditos) - Próximo sprint
- [ ] Integración con WhatsApp - Próximo sprint

---

## 🤝 ¿Cómo contribuir?

Si eres desarrollador y te apasiona la economía popular, haz un fork, crea una rama con `feature/nueva-funcionalidad` y abre un Pull Request. Toda ayuda es bienvenida.

---

## 📄 Licencia

MIT - Libre para usar y modificar.
