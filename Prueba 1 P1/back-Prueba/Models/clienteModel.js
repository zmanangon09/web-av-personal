import sequelize from "../config/clienteConfig.js";
import { DataTypes } from "sequelize";

// Definición del modelo Sequelize para la tabla 'clientes'
const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    porcentaje: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cuota: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "clientes",
    timestamps: false,
  }
);

// Funciones CRUD que usan el modelo Sequelize
const ClienteModel = {
  async obtenerTodos() {
    const registros = await Cliente.findAll();
    return registros.map((r) => r.get({ plain: true }));
  },

  async obtenerPorId(id) {
    const reg = await Cliente.findByPk(id);
    return reg ? reg.get({ plain: true }) : null;
  },

  async crear(nombre, monto) {
    const porcentaje = monto < 50000 ? 0.03 : 0.02;
    const cuota = monto * porcentaje;
    const creado = await Cliente.create({ nombre, monto, porcentaje, cuota });
    return creado.get({ plain: true });
  },

  async actualizar(id, datos) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    const nuevoMonto = datos.monto ?? cliente.monto;
    const porcentaje = nuevoMonto < 50000 ? 0.03 : 0.02;
    const cuota = nuevoMonto * porcentaje;
    await cliente.update({
      nombre: datos.nombre ?? cliente.nombre,
      monto: nuevoMonto,
      porcentaje,
      cuota,
    });
    return cliente.get({ plain: true });
  },

  async eliminar(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    const plain = cliente.get({ plain: true });
    await cliente.destroy();
    return plain;
  },
};

export default ClienteModel;
