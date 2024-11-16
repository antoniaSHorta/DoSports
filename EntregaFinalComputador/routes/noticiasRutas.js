import express from 'express';
import { getNoticias, getNoticia, getNoticiasDestacadas } from '../controllers/noticiasControlador.js';

const router = express.Router();

router.get('/', getNoticias);
router.get('/destacadas', getNoticiasDestacadas);
router.get('/:id', getNoticia);

export default router;