import express from "express";
import { login,register } from '../controllers/autenticacionControlador.js'; 


const router = express.Router();

// ENDPOINT LOGIN
router.post('/login', login); 

// ENDPOINT REGISTRO
router.post('/register', register);

export default router;

