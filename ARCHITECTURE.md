# 🏗️ Arquitectura de PuntoÁgil 360

## 📐 Diseño Modular (Un Repositorio, 4 Dominios de Negocio)

```
puntoagil-backend/
├── src/
│   ├── modules/
│   │   ├── pos/               (Módulo 1: Punto de Venta - Offline)
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── entities/      (Ventas, DetallesVenta, CortesCaja)
│   │   │
│   │   ├── credits/           (Módulo 2: FiadoPro - Créditos)
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── entities/      (Clientes, CuentasPorCobrar, Abonos, Morosidad)
│   │   │
│   │   ├── inventory/         (Módulo 3: NoSeVence - Caducidades)
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── entities/      (Productos, Lotes, FechasVencimiento, Mermas)
│   │   │
│   │   └── procurement/       (Módulo 4: CompraJusta - Proveedores)
│   │       ├── controllers/
│   │       ├── services/
│   │       └── entities/      (Proveedores, PreciosHistoricos, OrdenesCompra)
│   │
│   ├── shared/                (Código compartido: autenticación, notificaciones)
│   └── main.ts                (Punto de entrada único)
```

## 🔗 ¿Cómo se "unen" estos 4 módulos?

### Flujo de Venta (El Corazón del Sistema)

1. **Usuario hace una venta en POS** → Se crea un `Sale` con múltiples `SaleDetail`
2. **POS dispara un evento** → Los otros módulos lo escuchan
3. **Inventory escucha** → Descuenta el stock del lote que vence primero (PEPS automático)
4. **Si es fiado** → Credits registra la deuda automáticamente
5. **Si stock baja del mínimo** → Procurement sugiere reabastecer

### Dashboard Central (El Cerebro)

Un quinto módulo consulta a los otros 4 y muestra en una sola pantalla:

- "Ventas hoy: $500" (desde POS)
- "Deudas vigentes: $1.200" (desde Credits)
- "Queso vence mañana: 5 unidades" (desde Inventory)
- "El aceite está $50 más barato en Proveedor X" (desde Procurement)

### Notificaciones Unificadas

Un solo servicio de WhatsApp/SMS que envía:

- El ticket de compra (POS)
- El recordatorio de pago (Credits)
- La alerta de productos por vencer (Inventory)

---

## 📅 Plan de Desarrollo (Fases)

### Fase 1 (MVP - El Core) ✅ EN PROGRESO
- Módulo pos + inventory básico
- Vender, restar stock y cierre de caja
- Subes esto a producción

### Fase 2 (El Crédito)
- Módulo credits
- Campo "¿Es fiado?" en la venta
- Libreta de cobros

### Fase 3 (Inteligencia)
- Módulo procurement + alertas de inventory
- Escáner de vencimientos
- Comparador de precios

### Fase 4 (El Conector)
- Dashboard en tiempo real
- Integraciones de WhatsApp
- Reportes analíticos

---

## 🧬 Patrones de Diseño

### NestJS Modules

Cada módulo de negocio es un `@Module()` que encapsula:

- **Controllers**: Manejan las rutas HTTP
- **Services**: Lógica de negocio
- **Entities/DTOs**: Tipos de datos
- **Providers**: Inyección de dependencias

### Event-Driven Architecture

Los módulos se comunican mediante eventos en lugar de acoplamiento directo:

```typescript
// En POS Service
this.eventEmitter.emit('sale.created', sale);

// En Inventory Service (escucha)
@OnEvent('sale.created')
async handleSaleCreated(sale: Sale) {
  // Descontar stock
}
```

### Single Database with Schemas

Una sola DB PostgreSQL, pero con relaciones bien definidas en Prisma:

```prisma
model Sale {
  // Vendedor
  cashierId String
  // Cliente (si es fiado)
  customerId String?
  customer Customer?
}
```

---

## 🚀 Comandos Útiles

```bash
# Generar cliente Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Abrir Prisma Studio (GUI para ver datos)
npm run prisma:studio

# Iniciar en desarrollo con watch
npm run start:dev

# Generar build de producción
npm run build

# Iniciar en producción
npm run start:prod
```

---

## 📚 Referencias

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
