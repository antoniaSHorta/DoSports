import express from "express";
import { buscarGeneral } from '../controllers/busquedaControlador.js';

const router = express.Router();

router.get('/buscar', buscarGeneral);

export default router;