import { Router } from "express";
import {
  calcularCompraArboles,
  listarComprasArboles,
  obtenerCompraArbol,
  eliminarCompraArbol,
  actualizarCompraArbol,
} from "../controllers/arbolController.js";

const router = Router();

// Registrar rutas
router.post("/calcular", calcularCompraArboles); // realiza cálculo y guarda
router.get("/", listarComprasArboles); // lista todas las compras
router.get("/:id", obtenerCompraArbol); // detalle
router.delete("/:id", eliminarCompraArbol); // eliminar
router.put("/:id", actualizarCompraArbol); // actualizar y recalcular

export default router;
