// Clase que representa un cliente con financiamiento
class Cliente {
  constructor(id, monto) {
    this.id = id;
    this.monto = monto;
  }

  // Calcula la cuota según el monto
  calcularCuota() {
    let porcentaje;
    if (this.monto < 50000 & this.monto >=0) {
      porcentaje = 0.03; // 3%
    } else {
      porcentaje = 0.02; // 2%
    }
    
    const cuota = this.monto * porcentaje;

    return {
      monto: this.monto.toFixed(2),
      porcentaje: (porcentaje * 100).toFixed(0) + '%',
      cuota: cuota.toFixed(2)
    };
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

  static crear(monto) {
    const id = this.clientes.length + 1;
    const nuevo = new Cliente(id, monto);
    this.clientes.push(nuevo);
    return nuevo;
  }

  static actualizar(id, datos) {
    const cliente = this.obtenerPorId(id);
    if (!cliente) return null;
    cliente.monto = datos.monto ?? cliente.monto;
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
