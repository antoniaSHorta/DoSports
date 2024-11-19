import express from "express";
import mysql from "mysql2";
import bodyparser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import rutas from './routes/rutas.js'; 
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = 3000;

// MIDDLEWARES
app.use(cors());
app.use(bodyparser.json());


//CONEXION DB
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// PRUEBAS DE CONEXION
conexion.connect((error) => {
    if (error) {
        console.log("NO SE PUDO CONECTAR A DB", error);
        process.exit();
    }
    console.log("SI SE PUDO CONECTAR A DB");
});

app.set("dbConnection", conexion);


app.use('/api', rutas);


// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`SERVIDOR ARRIBA ${PORT}`);
});

// CERRAR CONEXION
process.on("SIGINT", () => {
    console.log("CERRANDO SERVIDOR");
    conexion.end((err) => {
        if (err) {
            console.log("ERROR AL CERRAR LA CONEXION", err);
        } else {
            console.log("SE CERRO CONEXION");
        }
        process.exit();
    });
});