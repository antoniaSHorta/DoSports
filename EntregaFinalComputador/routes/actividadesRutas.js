import express from "express";
import { getActividades, inscribirActividad,getActividad } from '../controllers/actividadesControlador.js';

const router = express.Router();

router.get('/actividades', getActividades);
router.post('/actividades/inscribir', inscribirActividad);
router.get('/actividades/:id', getActividad);
export default router;