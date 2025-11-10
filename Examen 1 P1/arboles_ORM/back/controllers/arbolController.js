import ArbolCompra from "../models/arbol.js";
const CATALOGO = {
  paltos: {
    precio: 1200,
    rebaja100a300: 0.10,
    rebajaMas300: 0.18,
  },
  limones: {
    precio: 1000,
    rebaja100a300: 0.125,
    rebajaMas300: 0.20,
  },
  chirimoyos: {
    precio: 980,
    rebaja100a300: 0.145,
    rebajaMas300: 0.19,
  },
};

//ajustable
const IVA_RATE = 0.15;

const normalizarTipo = (raw) => {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim().toLowerCase();
  return s === "" ? null : s;
};


// usamos para reutilizar ya q calcula todos los valores a partir de tipo y cantidad
const calcularValores = (tipoArbol, cantidad) => {
  const { precio, rebaja100a300, rebajaMas300 } = CATALOGO[tipoArbol];

  // Determinar rebaja base por rango
  let rebajaBase = 0;
  if (cantidad > 100 && cantidad <= 300) {
    rebajaBase = rebaja100a300;
  } else if (cantidad > 300) {
    rebajaBase = rebajaMas300;
  }

  // Rebaja adicional si supera 1000 unidades (mismo tipo)
  const rebajaAdicional = cantidad > 1000 ? 0.15 : 0;
  const rebajaTotal = Math.min(rebajaBase + rebajaAdicional, 0.95); // cap defensivo

  const subtotal = precio * cantidad;
  const descuentoValor = subtotal * rebajaTotal;
  const baseImponible = subtotal - descuentoValor;
  const iva = baseImponible * IVA_RATE;
  const totalPagar = baseImponible + iva;

  return {
    precio,
    rebajaTotal,
    subtotal: Number(subtotal.toFixed(2)),
    descuentoValor: Number(descuentoValor.toFixed(2)),
    iva: Number(iva.toFixed(2)),
    totalPagar: Number(totalPagar.toFixed(2)),
  };
};

// Body: { tipoArbol: "paltos"|"limones"|"chirimoyos", cantidad: number }
export const calcularCompraArboles = async (req, res) => {
  try {
    const tipoArbol = normalizarTipo(req.body.tipoArbol);
    const cantidad = Number(req.body.cantidad);

    // Validaciones básicas
    if (!tipoArbol || !(tipoArbol in CATALOGO)) {
      return res
        .status(400)
        .json({ mensaje: "tipoArbol inválido. Use: paltos, limones o chirimoyos." });
    }
    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      return res
        .status(400)
        .json({ mensaje: "cantidad debe ser un número mayor a 0." });
    }

    const { precio, rebajaTotal, subtotal, descuentoValor, iva, totalPagar } = calcularValores(
      tipoArbol,
      cantidad
    );

    // Persistimos el registro de compra
    const compra = await ArbolCompra.create({
      tipoArbol,
      precioUnitario: precio,
      cantidad,
      rebaja: rebajaTotal,
      iva,
      totalPagar,
      subtotal,
      descuentoValor,
    });

    return res.status(201).json(compra);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al calcular la compra de árboles", error: error.message });
  }
};

// GET /api/arboles
export const listarComprasArboles = async (_req, res) => {
  try {
    const compras = await ArbolCompra.findAll({ order: [["createdAt", "DESC"]] });
    return res.json(compras);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al listar compras de árboles", error: error.message });
  }
};

// GET /api/arboles/:id
export const obtenerCompraArbol = async (req, res) => {
  try {
    const compra = await ArbolCompra.findByPk(req.params.id);
    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });
    return res.json(compra);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al obtener la compra", error: error.message });
  }
};

// DELETE /api/arboles/:id
export const eliminarCompraArbol = async (req, res) => {
  try {
    const compra = await ArbolCompra.findByPk(req.params.id);
    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });
    await compra.destroy();
    return res.json({ mensaje: "Compra eliminada correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al eliminar la compra", error: error.message });
  }
};

// PUT /api/arboles/:id  (actualiza tipo/cantidad y recalcula)
export const actualizarCompraArbol = async (req, res) => {
  try {
    const compra = await ArbolCompra.findByPk(req.params.id);
    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });

    const tipoArbol = normalizarTipo(req.body.tipoArbol);
    const cantidad = Number(req.body.cantidad);

    if (!tipoArbol || !(tipoArbol in CATALOGO)) {
      return res
        .status(400)
        .json({ mensaje: "tipoArbol inválido. Use: paltos, limones o chirimoyos." });
    }
    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      return res.status(400).json({ mensaje: "cantidad debe ser un número mayor a 0." });
    }

    const { precio, rebajaTotal, subtotal, descuentoValor, iva, totalPagar } = calcularValores(
      tipoArbol,
      cantidad
    );

    await compra.update({
      tipoArbol,
      precioUnitario: precio,
      cantidad,
      rebaja: rebajaTotal,
      subtotal,
      descuentoValor,
      iva,
      totalPagar,
    });

    return res.json(compra);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al actualizar la compra", error: error.message });
  }
};
