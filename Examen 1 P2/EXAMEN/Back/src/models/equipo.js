import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Equipo = sequelize.define(
    'Equipo',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_equipo'
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'nombre',
            unique: true,
            validate: {
                notEmpty: { msg: "El nombre del equipo es obligatorio" },
                len: { args: [2, 100], msg: "El nombre debe tener entre 2 y 100 caracteres" }
            }
        }
    },
    {
        tableName: 'equipos',
        timestamps: false
    }
);
