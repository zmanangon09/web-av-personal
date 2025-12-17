import { Equipo } from '../models/equipo.js';
import { Jugador } from '../models/jugador.js';

// Obtener todos los equipos
export const getEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.findAll({
            include: [{
                model: Jugador,
                attributes: ['id', 'nombre']
            }]
        });
        res.json(equipos);
    } catch (error) {
        console.error('Error al obtener equipos:', error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener un equipo por ID
export const getEquipoById = async (req, res) => {
    try {
        const equipo = await Equipo.findByPk(req.params.id, {
            include: [{
                model: Jugador,
                attributes: ['id', 'nombre']
            }]
        });
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json(equipo);
    } catch (error) {
        console.error('Error al obtener equipo:', error);
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo equipo
export const createEquipo = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre del equipo es obligatorio' });
        }

        const nuevoEquipo = await Equipo.create({ nombre });
        res.status(201).json(nuevoEquipo);
    } catch (error) {
        console.error('Error al crear equipo:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Ya existe un equipo con ese nombre' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un equipo
export const updateEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const equipo = await Equipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }

        if (!nombre) {
            return res.status(400).json({ message: 'El nombre del equipo es obligatorio' });
        }

        await equipo.update({ nombre });
        res.json(equipo);
    } catch (error) {
        console.error('Error al actualizar equipo:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Ya existe un equipo con ese nombre' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un equipo
export const deleteEquipo = async (req, res) => {
    try {
        const { id } = req.params;

        const equipo = await Equipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }

        // Verificar si el equipo tiene jugadores
        const jugadores = await Jugador.count({ where: { id_equipo: id } });
        if (jugadores > 0) {
            return res.status(400).json({ 
                message: 'No se puede eliminar el equipo porque tiene jugadores asociados. Elimine los jugadores primero.' 
            });
        }

        await equipo.destroy();
        res.json({ message: 'Equipo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar equipo:', error);
        res.status(500).json({ message: error.message });
    }
};
