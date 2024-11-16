import express from "express";
import { getHistorialUsuario } from '../controllers/historialControlador.js';

const router = express.Router();

router.get('/historial/:idUsuario', getHistorialUsuario);

export default router;