import express from "express";
import ClienteController from "../Controllers/clienteController.js";

const router = express.Router();

// CRUD completo
router.post("/", ClienteController.crear);
router.get("/", ClienteController.obtenerTodos);
router.get("/:id", ClienteController.obtenerPorId);
router.put("/:id", ClienteController.actualizar);
router.delete("/:id", ClienteController.eliminar);

export default router;
