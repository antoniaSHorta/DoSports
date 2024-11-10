import express from "express";
import mysql from "mysql2";
import bodyparser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = 3306;

app.use(cors());
app.use(bodyparser.json());

dotenv.config();

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
        return;
    }
    console.log("SI SE PUDO CONECTAR A DB");
})

app.listen(PORT,()=>{
    console.log("SERVIDOR ARRIBA");
})