import express from "express";
import { getActividades, inscribirActividad,getActividad } from '../controllers/actividadesControlador.js';
import { getConsultasUsuario, getHorariosDisponibles, crearConsulta } from '../controllers/asesoramientoControlador.js';
import { login,register } from '../controllers/autenticacionControlador.js'; 
import { buscarGeneral } from '../controllers/busquedaControlador.js';
import { getForos, getPostsByForo, getComentarios, createPost, createComentario } from '../controllers/foroControlador.js';
import { getHistorialUsuario } from '../controllers/historialControlador.js';
import { getNoticias, getNoticia, getNoticiasDestacadas } from '../controllers/noticiasControlador.js';


const router = express.Router();

router.get('/actividades', getActividades);
router.post('/actividades/inscribir', inscribirActividad);
router.get('/actividades/:id', getActividad);

router.get('/asesoramiento/consultas/:idUsuario', getConsultasUsuario);
router.get('/asesoramiento/horarios', getHorariosDisponibles);
router.post('/asesoramiento', crearConsulta);

// ENDPOINT LOGIN
router.post('/login', login); 

// ENDPOINT REGISTRO
router.post('/register', register);

router.get('/buscar', buscarGeneral);


router.get('/foros', getForos);
router.get('/foros/:idForo/posts', getPostsByForo);
router.get('/comentarios/:idPublicacion', getComentarios);
router.post('/posts', createPost);
router.post('/comentarios', createComentario);


router.get('/historial/:idUsuario', getHistorialUsuario);

router.get('/', getNoticias);
router.get('/destacadas', getNoticiasDestacadas);
router.get('/:id', getNoticia);

export default router;