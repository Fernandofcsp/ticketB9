# Proxy de Tickets Back9

Proxy CORS para consultar detalles de tickets desde la API de Back9.

## 🎯 Propósito

Este proxy resuelve problemas de CORS al consultar la API de tickets de Back9 desde aplicaciones web frontend.

## 🔗 API Original

```
https://back-back9.realvirtual.com.mx/api/client/orders?or_idEmpresa=17&or_idordenExt={ticketId}&details=true
```

## 🚀 Uso

### URL del Proxy
```
https://tu-proxy.vercel.app/api/ticket?ticketId={TICKET_ID}
```

### Ejemplo
```javascript
const response = await fetch('https://tu-proxy.vercel.app/api/ticket?ticketId=CANV455');
const ticketData = await response.json();
```

## 📋 Parámetros

| Parámetro | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `ticketId` | string | ID del ticket a consultar (ej: CANV455, LEBV456) | ✅ Sí |

## 📄 Respuesta

El proxy retorna exactamente los mismos datos que la API original:

```json
{
  "status": "SUCCESS",
  "orders": [...],
  "timezone": "America/Mexico_City",
  "responseFormat": "flat",
  "dateFilters": {...}
}
```

## 🛠️ Desarrollo Local

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en desarrollo:
```bash
npm run dev
```

3. Probar el endpoint:
```bash
curl "http://localhost:3000/api/ticket?ticketId=CANV455"
```

## 🚀 Deployment

### Opción 1: Vercel CLI
```bash
npm run deploy
```

### Opción 2: Git Integration
1. Conectar repositorio con Vercel
2. Push automático deploya cambios

## ⚠️ Consideraciones

- **Límites de tiempo**: 30 segundos máximo por request
- **CORS**: Configurado para permitir todos los orígenes
- **Rate Limiting**: Depende de los límites de Vercel
- **Logs**: Disponibles en Vercel Dashboard

## 🔧 Estructura del Proyecto

```
ticket-proxy-b9/
├── api/
│   └── ticket.js          # Función serverless principal
├── .github/
│   └── copilot-instructions.md
├── package.json
├── vercel.json            # Configuración de Vercel
└── README.md
```

## 📝 Logs

El proxy genera logs útiles para debugging:
- `🎫 Consultando ticket: {ticketId}`
- `🔗 URL API: {url}`
- `✅ Datos obtenidos exitosamente`
- `❌ Error API: {status}`

## 🆘 Troubleshooting

### Error 400: Parámetro faltante
- Verificar que se incluye `ticketId` en la query string

### Error 404: Ticket no encontrado
- El ticket no existe en la base de datos
- Verificar el ID del ticket

### Error 500: Error interno
- Problemas de conectividad con la API original
- Revisar logs en Vercel Dashboard