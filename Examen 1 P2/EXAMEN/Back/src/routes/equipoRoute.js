import { Router } from 'express';
import { getEquipos, createEquipo, updateEquipo, deleteEquipo, getEquipoById } from '../controllers/equipoController.js';

const router = Router();

router.get('/', getEquipos);
router.get('/:id', getEquipoById);
router.post('/', createEquipo);
router.put('/:id', updateEquipo);
router.delete('/:id', deleteEquipo);

export default router;
