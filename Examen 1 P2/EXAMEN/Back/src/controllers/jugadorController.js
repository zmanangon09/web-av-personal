import { Jugador } from '../models/jugador.js';
import { Equipo } from '../models/equipo.js';

// Obtener todos los jugadores
export const getJugadores = async (req, res) => {
    try {
        const jugadores = await Jugador.findAll({
            include: [{
                model: Equipo,
                attributes: ['id', 'nombre']
            }]
        });
        res.json(jugadores);
    } catch (error) {
        console.error('Error al obtener jugadores:', error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener jugadores por equipo
export const getJugadoresByEquipo = async (req, res) => {
    try {
        const { equipoId } = req.params;
        const jugadores = await Jugador.findAll({
            where: { id_equipo: equipoId },
            include: [{
                model: Equipo,
                attributes: ['id', 'nombre']
            }]
        });
        res.json(jugadores);
    } catch (error) {
        console.error('Error al obtener jugadores por equipo:', error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener un jugador por ID
export const getJugadorById = async (req, res) => {
    try {
        const jugador = await Jugador.findByPk(req.params.id, {
            include: [{
                model: Equipo,
                attributes: ['id', 'nombre']
            }]
        });
        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.json(jugador);
    } catch (error) {
        console.error('Error al obtener jugador:', error);
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo jugador
export const createJugador = async (req, res) => {
    try {
        const { nombre, id_equipo } = req.body;
        
        if (!nombre || !id_equipo) {
            return res.status(400).json({ message: 'El nombre y el equipo son obligatorios' });
        }

        // Verificar que el equipo existe
        const equipo = await Equipo.findByPk(id_equipo);
        if (!equipo) {
            return res.status(404).json({ message: 'El equipo especificado no existe' });
        }

        const nuevoJugador = await Jugador.create({ nombre, id_equipo });
        
        // Obtener el jugador con el equipo incluido
        const jugadorCreado = await Jugador.findByPk(nuevoJugador.id, {
            include: [{
                model: Equipo,
                attributes: ['id', 'nombre']
            }]
        });
        
        res.status(201).json(jugadorCreado);
    } catch (error) {
        console.error('Error al crear jugador:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un jugador
export const updateJugador = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, id_equipo } = req.body;

        const jugador = await Jugador.findByPk(id);
        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }

        if (!nombre || !id_equipo) {
            return res.status(400).json({ message: 'El nombre y el equipo son obligatorios' });
        }

        // Verificar que el equipo existe si se está cambiando
        if (id_equipo !== jugador.id_equipo) {
            const equipo = await Equipo.findByPk(id_equipo);
            if (!equipo) {
                return res.status(404).json({ message: 'El equipo especificado no existe' });
            }
        }

        await jugador.update({ nombre, id_equipo });
        
        // Obtener el jugador actualizado con el equipo incluido
        const jugadorActualizado = await Jugador.findByPk(id, {
            include: [{
                model: Equipo,
                attributes: ['id', 'nombre']
            }]
        });
        
        res.json(jugadorActualizado);
    } catch (error) {
        console.error('Error al actualizar jugador:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un jugador
export const deleteJugador = async (req, res) => {
    try {
        const { id } = req.params;

        const jugador = await Jugador.findByPk(id);
        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }

        await jugador.destroy();
        res.json({ message: 'Jugador eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar jugador:', error);
        res.status(500).json({ message: error.message });
    }
};
