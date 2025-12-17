import { Router } from 'express';
import { getJugadores, createJugador, updateJugador, deleteJugador, getJugadorById, getJugadoresByEquipo } from '../controllers/jugadorController.js';

const router = Router();

router.get('/', getJugadores);
router.get('/:id', getJugadorById);
router.get('/equipo/:equipoId', getJugadoresByEquipo);
router.post('/', createJugador);
router.put('/:id', updateJugador);
router.delete('/:id', deleteJugador);

export default router;
