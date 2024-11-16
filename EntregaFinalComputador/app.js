import express from "express";
import mysql from "mysql2";
import bodyparser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// IMPORTAR RUTAS DE AUTENTICACION
import autenticacionRutas from './routes/autenticacionRutas.js';
import actividadesRutas from './routes/actividadesRutas.js';
import busquedaRutas from './routes/busquedaRutas.js';
import noticiasRutas from './routes/noticiasRutas.js';
import foroRutas from './routes/foroRutas.js';
import historialRutas from './routes/historialRutas.js';
import asesoramientoRutas from './routes/asesoramientoRutas.js';


dotenv.config();

const app = express();
const PORT = 3000;

// MIDDLEWARES

app.use(cors());
app.use(bodyparser.json());


//CONEXION DB

dotenv.config();

const conexion = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME

});

// PRUEBAS DE CONEXION

conexion.connect((error)=>{
    if(error){
        console.log("NO SE PUDO CONECTAR A DB",error);
        process.exit();
    }
    console.log("SI SE PUDO CONECTAR A DB");
})


app.set("dbConnection",conexion);
app.use('/api/autenticacion', autenticacionRutas);
app.use('/api', actividadesRutas);
app.use('/api', busquedaRutas);
app.use('/api/noticias', noticiasRutas);
app.use('/api/foro', foroRutas);
app.use('/api', historialRutas);
app.use('/api', asesoramientoRutas);



// INICIAR SERVIDOR

app.listen(PORT,()=>{
    console.log(`SERVIDOR ARRIBA ${PORT}`);
});


// CERRAR CONEXION

process.on("SIGINT", () => {
    console.log("CERRANDO SERVIDOR");
    conexion.end((err) => {
        if(err) {
            console.log("ERROR AL CERRAR LA CONEXION",err);
        }
        else{
            console.log("SE CERRO CONEXION");
        }
        process.exit();
    });
});