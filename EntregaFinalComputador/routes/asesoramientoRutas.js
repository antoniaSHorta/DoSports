import express from "express";
import { 
    getConsultasUsuario, 
    getHorariosDisponibles, 
    crearConsulta 
} from '../controllers/asesoramientoControlador.js';

const router = express.Router();

router.get('/asesoramiento/consultas/:idUsuario', getConsultasUsuario);
router.get('/asesoramiento/horarios', getHorariosDisponibles);
router.post('/asesoramiento', crearConsulta);

export default router;