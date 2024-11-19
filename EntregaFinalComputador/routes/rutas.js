// IMPORTAMOS API DE CADA FUNCIONALIDAD
import express from "express";
import { getActividades, inscribirActividad,getActividad,cancelarInscripcion} from '../controllers/actividadesControlador.js';
import { getConsultasUsuario, getHorariosDisponibles, crearConsulta } from '../controllers/asesoramientoControlador.js';
import { login,register,actualizarUsuario,cambiarContrasena} from '../controllers/autenticacionControlador.js'; 
import { buscarGeneral } from '../controllers/busquedaControlador.js';
import { getForos, getPostsByForo, getComentarios, createPost, createComentario } from '../controllers/foroControlador.js';
import { getHistorialUsuario } from '../controllers/historialControlador.js';
import { getNoticias, getNoticia, getNoticiasDestacadas } from '../controllers/noticiasControlador.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

// OBTENEMOS LAS RUTAS DE CADA FUNCIONALIDAD //

// ACTIVIDADES //
router.get('/actividades', verifyToken, getActividades);
router.post('/actividades/inscribir', verifyToken, inscribirActividad);
router.get('/actividades/:id', verifyToken, getActividad);
router.delete('/actividades/cancelar/:idActividad/:idUsuario', verifyToken, cancelarInscripcion);

// ASESORAMIENTO //
router.get('/asesoramiento/consultas/:idUsuario', verifyToken, getConsultasUsuario);
router.get('/asesoramiento/horarios', verifyToken, getHorariosDisponibles);
router.post('/asesoramiento', verifyToken, crearConsulta);


// ENDPOINT LOGIN //
router.post('/login', login); 

// ENDPOINT REGISTRO //
router.post('/register', register);

// CUENTA //
router.put('/usuario/:id', verifyToken, actualizarUsuario);
router.put('/usuario/cambiar-contrasena/:id', verifyToken, cambiarContrasena);

// BUSCAR //
router.get('/buscar', buscarGeneral);

// FOROS //
router.get('/foros', verifyToken, getForos);
router.get('/foros/:idForo/posts', verifyToken, getPostsByForo);
router.get('/comentarios/:idPublicacion', verifyToken, getComentarios);
router.post('/posts', verifyToken, createPost);
router.post('/comentarios', verifyToken, createComentario);

// HISTORIAL //
router.get('/historial/:idUsuario', verifyToken, getHistorialUsuario);

// NOTICIAS //
router.get('/noticias/destacadas', getNoticiasDestacadas);
router.get('/noticias/:id', getNoticia);
router.get('/noticias', getNoticias);




export default router;