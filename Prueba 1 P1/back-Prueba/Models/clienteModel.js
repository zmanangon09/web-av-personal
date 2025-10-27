// Clase que representa un cliente con financiamiento
class Cliente {
  constructor(id, nombre, monto) {
    this.id = id;
    this.nombre = nombre;
    this.monto = monto;
    this.porcentaje = this.monto < 50000 ? 0.03 : 0.02;
    this.cuota = this.monto * this.porcentaje;
  }
}

// Clase que administra todos los clientes
class ClienteModel {
  static clientes = [];

  static obtenerTodos() {
    return this.clientes;
  }

  static obtenerPorId(id) {
    return this.clientes.find((c) => c.id === parseInt(id));
  }

  static crear(nombre, monto) {
    const id = this.clientes.length + 1;
    const nuevo = new Cliente(id, nombre, monto);
    this.clientes.push(nuevo);
    return nuevo;
  }

  static actualizar(id, datos) {
    const cliente = this.obtenerPorId(id);
    if (!cliente) return null;
    cliente.nombre = datos.nombre ?? cliente.nombre;
    cliente.monto = datos.monto ?? cliente.monto;
    cliente.porcentaje = cliente.monto < 50000 ? 0.03 : 0.02;
    cliente.cuota = cliente.monto * cliente.porcentaje;
    return cliente;
  }

  static eliminar(id) {
    const index = this.clientes.findIndex((c) => c.id === parseInt(id));
    if (index !== -1) {
      return this.clientes.splice(index, 1)[0];
    }
    return null;
  }
}

export { Cliente };
export default ClienteModel;
