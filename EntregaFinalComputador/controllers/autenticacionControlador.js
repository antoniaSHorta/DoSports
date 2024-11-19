import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

// INICIO SESION //
export const login = (req, res) => {
    const { usuario, contrasena } = req.body;
    const conexion = req.app.get("dbConnection");

    const query = "SELECT idUsuario, nombre, contrasena FROM usuarios WHERE nombre = ?";
    
    conexion.query(query, [usuario], (error, resultados) => {
        if (error) 
        {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }

        if (resultados && resultados.length > 0) {
            try 
            {
                const validPassword = bcrypt.compareSync(contrasena, resultados[0].contrasena);
                if (!validPassword) 
                {
                    return res.status(401).json({ message: "Usuario o contraseña incorrecta" });
                }
    
                const token = jwt.sign(
                    { id: resultados[0].idUsuario },
                    secretKey,
                    { expiresIn: '1h' }
                );
    
                res.status(200).json({
                    message: "Inicio de sesión exitoso",
                    usuario: {
                        id: resultados[0].idUsuario,
                        nombre: resultados[0].nombre
                    },
                    token
                });
            } 
            catch (err) 
            {
                console.error('Error en la autenticación:', err);
                res.status(500).json({ message: "Error en la autenticación" });
            }
        } 
        else {
            res.status(401).json({ message: "Usuario o contraseña incorrecta" });
        }
    });
};

// REGISTRARSE //

export const register = (req, res) => {
    const { region, comuna, usuario, correo, contrasena } = req.body;
    const conexion = req.app.get("dbConnection");

    // VERIFICAMOS QUE EL USUARIO NO EXISTA //
    const verificacionUser = "SELECT * FROM usuarios WHERE nombre = ?";

    conexion.query(verificacionUser, [usuario], (error, resultados) => {
        if (error) 
        {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }

        if (resultados && resultados.length > 0) 
        {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // INSERTAMOS EL REGISTRO //
        const hashedPassword = bcrypt.hashSync(contrasena, 10);
        const insertQuery = "INSERT INTO usuarios (region, comuna, nombre, correo, contrasena) VALUES (?, ?, ?, ?, ?)";
        conexion.query(insertQuery, [region, comuna, usuario, correo, hashedPassword], (error, resultados) => {
            if (error) {
                console.log("Error en la consulta", error);
                return res.status(500).json({ message: "NO SE PUDO INSERTAR" });
            }
            res.status(201).json({ message: "Usuario registrado exitosamente" });
        });
    });
};

// ACTUALIZAMOS INFORMACION USUARIO //
export const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, correo, region, comuna } = req.body;
    const conexion = req.app.get("dbConnection");

    // VERIFICAMOS QUE EL CORREO NO EXISTA //
    const checkEmailQuery = "SELECT idUsuario FROM usuarios WHERE correo = ? AND idUsuario != ?";
    conexion.query(checkEmailQuery, [correo, id], (error, resultados) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }

        if(resultados.length > 0) {
            return res.status(400).json({message: "El correo ya está en uso"});
        }
    
        // ACTUALIZAMOS DATOS //
        const updateQuery = "UPDATE usuarios SET nombre = ?, correo = ?, region = ?, comuna = ? WHERE idUsuario = ?";
        conexion.query(updateQuery, [nombre, correo, region, comuna, id], (error) => {
            if(error) {
                console.log("ERROR EN LA CONSULTA", error);
                return res.status(500).json({message: "Error en el servidor"});
            }

            res.status(200).json({
                message: "Datos actualizados exitosamente",
                usuario: { id, nombre, correo, region, comuna }
            });
        });
    });
};

// CAMBIAR CONTRASEÑA //
export const cambiarContrasena = (req, res) => {
    const { id } = req.params;
    const { contrasenaActual, nuevaContrasena } = req.body;
    const conexion = req.app.get("dbConnection");

    // VERIFICAMOS LA CONTRASEÑA ANTIGUA //
    const checkQuery = "SELECT contrasena FROM usuarios WHERE idUsuario = ?";
    conexion.query(checkQuery, [id], async (error, resultados) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }

        if(resultados.length === 0) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        const contrasenaValida = await bcrypt.compare(contrasenaActual, resultados[0].contrasena);
        if(!contrasenaValida) {
            return res.status(400).json({message: "La contraseña actual es incorrecta"});
        }

        // ACTUALIZAMOS CONTRASEÑA NUEVA//
        const salt = await bcrypt.genSalt(10);
        const contrasenaHash = await bcrypt.hash(nuevaContrasena, salt);

        const updateQuery = "UPDATE usuarios SET contrasena = ? WHERE idUsuario = ?";
        conexion.query(updateQuery, [contrasenaHash, id], (error) => {
            if(error) {
                console.log("ERROR EN LA CONSULTA", error);
                return res.status(500).json({message: "Error en el servidor"});
            }
            res.status(200).json({message: "Contraseña actualizada exitosamente"});
        });
    });
};
