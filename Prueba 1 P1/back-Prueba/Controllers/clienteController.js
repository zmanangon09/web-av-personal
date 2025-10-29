import ClienteModel from "../Models/clienteModel.js";

class ClienteController {
  // Crear cliente
  static async crear(req, res) {
    try {
      const { nombre, monto } = req.body;
      if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ mensaje: "El nombre es requerido." });
      }
      if (monto == null || isNaN(monto) || monto < 0) {
        return res.status(400).json({ mensaje: "El monto debe ser un número positivo." });
      }
      const nuevo = await ClienteModel.crear(nombre, Number(monto));
      res.status(201).json({
        mensaje: "Cliente creado correctamente",
        cliente: {
          id: nuevo.id,
          nombre: nuevo.nombre,
          monto: nuevo.monto,
          porcentaje: (nuevo.porcentaje * 100) + "%",
          cuota: Number(nuevo.cuota).toFixed(2),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al crear cliente" });
    }
  }

  // Obtener todos
  static async obtenerTodos(req, res) {
    try {
      const clientes = await ClienteModel.obtenerTodos();
      res.json(
        clientes.map((c) => ({
          id: c.id,
          nombre: c.nombre,
          monto: c.monto,
          porcentaje: (c.porcentaje * 100) + "%",
          cuota: Number(c.cuota).toFixed(2),
        }))
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al obtener clientes" });
    }
  }

  // Obtener por ID
  static async obtenerPorId(req, res) {
    try {
      const cliente = await ClienteModel.obtenerPorId(req.params.id);
      if (!cliente) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
      }
      res.json({
        id: cliente.id,
        nombre: cliente.nombre,
        monto: cliente.monto,
        porcentaje: (cliente.porcentaje * 100) + "%",
        cuota: Number(cliente.cuota).toFixed(2),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al obtener cliente" });
    }
  }

  // Actualizar
  static async actualizar(req, res) {
    try {
      const cliente = await ClienteModel.actualizar(req.params.id, req.body);
      if (!cliente) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
      }
      res.json({
        mensaje: "Cliente actualizado",
        cliente: {
          id: cliente.id,
          nombre: cliente.nombre,
          monto: cliente.monto,
          porcentaje: (cliente.porcentaje * 100) + "%",
          cuota: Number(cliente.cuota).toFixed(2),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al actualizar cliente" });
    }
  }

  // Eliminar
  static async eliminar(req, res) {
    try {
      const eliminado = await ClienteModel.eliminar(req.params.id);
      if (!eliminado) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
      }
      res.json({ mensaje: "Cliente eliminado", eliminado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al eliminar cliente" });
    }
  }
}

export default ClienteController;
