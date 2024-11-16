
export const login = (req, res) => {
    const {usuario, contrasena} = req.body;
    const conexion = req.app.get("dbConnection");

    const query = "SELECT idUsuario, nombre FROM usuarios WHERE nombre = ? AND contrasena = ?";
    conexion.query(query, [usuario, contrasena], (error, resultados) => {
        if(error){
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }

        if(resultados && resultados.length > 0){
            res.status(200).json({ 
                message: "Inicio de sesión exitoso",
                usuario: {
                    id: resultados[0].idUsuario,
                    nombre: resultados[0].nombre
                }
            });
        } else {
            res.status(401).json({message: "Usuario o contraseña incorrecta"});
        }
    });
};

export const register = (req, res) => {
    const {region, comuna, usuario, correo, contrasena} = req.body;
    const conexion = req.app.get("dbConnection");

    // VERIFICAMOS QUE EL USERNAME NO EXISTA
    const verificacionUser = "SELECT * FROM usuarios WHERE nombre = ?";
    conexion.query(verificacionUser, [usuario], (error,resultados) => {
        if(error){
            console.log("ERROR EN LA CONSULTA",error);
            return res.status(500).json({message: "Error en el servidor"});
        }

        if(resultados && resultados.length > 0){
            return res.status(400).json({message: "El usuario ya existe"});
        }
        
        const insertQuery = "INSERT INTO usuarios (region, comuna, nombre, correo, contrasena) VALUES (?, ?, ?, ?, ?)";
        conexion.query(insertQuery,[region, comuna, usuario, correo, contrasena],(error,resultados) =>{
            if(error){
                console.log("Error en la consulta",error);
                return res.status(500).json({message: "NO SE PUDO INSERTAR"});
            }
            res.status(201).json({message:"Usuario registrado exitosamente"});
        });
    });
};