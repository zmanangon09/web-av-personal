import ClienteModel from "../Models/clienteModel.js";

class ClienteController {
  // Crear cliente
  static crear(req, res) {
    const { nombre, monto } = req.body;
    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({ mensaje: "El nombre es requerido." });
    }
    if (monto == null || monto < 0) {
      return res.status(400).json({ mensaje: "El monto debe ser positivo." });
    }
    const nuevo = ClienteModel.crear(nombre, monto);
    res.status(201).json({
      mensaje: "Cliente creado correctamente",
      cliente: {
        id: nuevo.id,
        nombre: nuevo.nombre,
        monto: nuevo.monto,
        porcentaje: (nuevo.porcentaje * 100) + '%',
        cuota: nuevo.cuota.toFixed(2)
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
    res.json({
      id: cliente.id,
      nombre: cliente.nombre,
      monto: cliente.monto,
      porcentaje: (cliente.porcentaje * 100) + '%',
      cuota: cliente.cuota.toFixed(2)
    });
  }

  // Actualizar
  static actualizar(req, res) {
    const cliente = ClienteModel.actualizar(req.params.id, req.body);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json({ 
      mensaje: "Cliente actualizado", 
      cliente: {
        id: cliente.id,
        nombre: cliente.nombre,
        monto: cliente.monto,
        porcentaje: (cliente.porcentaje * 100) + '%',
        cuota: cliente.cuota.toFixed(2)
      }
    });
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
