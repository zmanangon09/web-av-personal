import ClienteModel from "../Models/clienteModel.js";

class ClienteController {
  // Crear cliente
  static crear(req, res) {
    const { monto } = req.body;
    if (monto == null || monto < 0) {
      return res.status(400).json({ mensaje: "El monto debe ser positivo." });
    }
    const nuevo = ClienteModel.crear(monto);
    res.status(201).json({
      mensaje: "Cliente creado correctamente",
      cliente: {
        id: nuevo.id,
        monto: nuevo.monto
      }
    });
  }

  // Obtener todos
  static obtenerTodos(req, res) {
    const clientes = ClienteModel.obtenerTodos();
    res.json(clientes);
  }

  // Obtener por ID
  static obtenerPorId(req, res) {
    const cliente = ClienteModel.obtenerPorId(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json(cliente);
  }

  // Actualizar
  static actualizar(req, res) {
    const cliente = ClienteModel.actualizar(req.params.id, req.body);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json({ mensaje: "Cliente actualizado", cliente });
  }

  // Eliminar
  static eliminar(req, res) {
    const eliminado = ClienteModel.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json({ mensaje: "Cliente eliminado", eliminado });
  }
}

export default ClienteController;
