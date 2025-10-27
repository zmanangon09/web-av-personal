import express from "express";
import ClienteController from "../Controllers/clienteController.js";
import ClienteModel, { Cliente } from "../Models/clienteModel.js";

const router = express.Router();

// Ruta de cálculo de cuota
router.post("/calcular", (req, res) => {
  try {
    const { monto } = req.body;

    if (monto == null || monto < 0) {
      return res
        .status(400)
        .json({ mensaje: "El monto debe ser positivo y no nulo." });
    }

    const temp = new Cliente(0, monto);
    const resultado = temp.calcularCuota();

    return res.status(200).json({
      mensaje: "Cuota calculada con éxito",
      resultado,
    });
  } catch (error) {
    console.error("Error en /calcular:", error);
    res.status(500).json({ mensaje: "Error interno al calcular la cuota" });
  }
});

// CRUD completo
router.post("/", ClienteController.crear);
router.get("/", ClienteController.obtenerTodos);
router.get("/:id", ClienteController.obtenerPorId);
router.put("/:id", ClienteController.actualizar);
router.delete("/:id", ClienteController.eliminar);

export default router;
