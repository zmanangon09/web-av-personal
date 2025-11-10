# Backend: Criadero de Árboles

Este proyecto expone un único dominio (Express + Sequelize): compras de árboles con cálculo de descuentos e IVA.

## Endpoints

Base: `/api/arboles`

- `POST /calcular` Calcula, guarda y retorna una compra.
  Body JSON:
  ```json
  { "tipoArbol": "paltos|limones|chirimoyos", "cantidad": 350 }
  ```
  Respuesta (ejemplo):
  ```json
  {
    "id": 1,
    "tipoArbol": "paltos",
    "precioUnitario": 1200,
    "cantidad": 350,
    "rebaja": 0.33,
    "subtotal": 420000,
    "descuentoValor": 138600,
    "iva": 33648,
    "totalPagar": 315048,
    "createdAt": "2025-11-10T12:00:00.000Z",
    "updatedAt": "2025-11-10T12:00:00.000Z"
  }
  ```

- `GET /` Lista todas las compras.
- `GET /:id` Detalle de una compra.
- `DELETE /:id` Elimina una compra.

## Reglas de negocio implementadas

- Precios unitarios: paltos 1200, limones 1000, chirimoyos 980.
- Rebajas por cantidad:
  - >100 y ≤300: paltos 10%, limones 12.5%, chirimoyos 14.5%.
  - >300: paltos 18%, limones 20%, chirimoyos 19%.
- Rebaja adicional del 15% si la cantidad supera 1000 unidades.
- IVA aplicado sobre el valor después de rebajas: 12% (modificable en `controllers/arbolController.js`).

## Puesta en marcha

1. Configura `.env` con tus credenciales MySQL.
2. Instala dependencias y levanta el servidor.
3. Prueba el endpoint de árboles.

Comandos opcionales (PowerShell):

```powershell
# Instalar
npm install

# Ejecutar (si agregas script start)
npm start

# Desarrollo con recarga (si agregas script dev)
npm run dev

# Ejemplo de prueba rápida
Invoke-RestMethod -Uri "http://localhost:3000/api/arboles/calcular" -Method Post -ContentType "application/json" -Body (@{tipoArbol='paltos'; cantidad=350} | ConvertTo-Json)
```

## Notas

- El modelo `ArbolCompra` no realiza cálculos, solo guarda los resultados. Toda la lógica está en `controllers/arbolController.js`.
- Si necesitas considerar compras combinadas (>1000 entre varios tipos), podemos extender el endpoint para aceptar un arreglo de ítems y sumar cantidades.
- Todo el código relacionado con "obreros" se ha eliminado para simplificar el proyecto.
