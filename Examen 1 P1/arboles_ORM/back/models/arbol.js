import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class ArbolCompra extends Model {}
//no sabia que más poner xd
ArbolCompra.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    // paltos, limones, chirimoyos
    tipoArbol: { type: DataTypes.STRING(20), allowNull: false },
    precioUnitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    // porcentaje total aplicado (0.00 - 1.00), guardado como decimal
    rebaja: { type: DataTypes.DECIMAL(5, 4), allowNull: false },
    // valor del IVA calculado para la compra
    iva: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    // total final a pagar (subtotal - descuento + IVA)
    totalPagar: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    descuentoValor: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  },
  {
    sequelize,
    modelName: "ArbolCompra",
    tableName: "arbol_compras",
    timestamps: true,
  }
);

export default ArbolCompra;
