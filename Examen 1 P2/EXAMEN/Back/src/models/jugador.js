import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Equipo } from "./equipo.js";

export const Jugador = sequelize.define(
    'Jugador',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_jugador'
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'nombre',
            validate: {
                notEmpty: { msg: "El nombre del jugador es obligatorio" },
                len: { args: [2, 100], msg: "El nombre debe tener entre 2 y 100 caracteres" }
            }
        },
        id_equipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_equipo',
            references: {
                model: 'equipos',
                key: 'id_equipo'
            }
        }
    },
    {
        tableName: 'jugadores',
        timestamps: false
    }
);

// Definir relaciones aquí también para asegurar carga
Equipo.hasMany(Jugador, { foreignKey: 'id_equipo', onDelete: 'CASCADE' });
Jugador.belongsTo(Equipo, { foreignKey: 'id_equipo' });
