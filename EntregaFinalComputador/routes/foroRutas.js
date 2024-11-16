import express from "express";
import { getForos, getPostsByForo, getComentarios, createPost, createComentario } from '../controllers/foroControlador.js';

const router = express.Router();

router.get('/foros', getForos);
router.get('/foros/:idForo/posts', getPostsByForo);
router.get('/comentarios/:idPublicacion', getComentarios);
router.post('/posts', createPost);
router.post('/comentarios', createComentario);

export default router;