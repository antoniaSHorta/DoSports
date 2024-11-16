export const getConsultasUsuario = (req, res) => {
    const { idUsuario } = req.params;
    const conexion = req.app.get("dbConnection");
    
    const query = `
        SELECT idConsulta, tipo, descripcion, 
        DATE_FORMAT(fechaHora, '%Y-%m-%d %H:%i') as fechaHora,
        estado, respuesta
        FROM asesoramiento 
        WHERE idUsuario = ?
        ORDER BY fechaHora DESC
    `;
    
    conexion.query(query, [idUsuario], (error, resultados) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        res.status(200).json(resultados);
    });
};

export const getHorariosDisponibles = (req, res) => {
    const conexion = req.app.get("dbConnection");
    
    const query = `
        SELECT DATE_FORMAT(fechaHora, '%Y-%m-%d %H:%i') as fechaHora
        FROM horarios_disponibles
        WHERE disponible = true
        AND fechaHora > NOW()
        ORDER BY fechaHora ASC
    `;
    
    conexion.query(query, (error, resultados) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        res.status(200).json(resultados.map(r => r.fechaHora));
    });
};

export const crearConsulta = (req, res) => {
    const { idUsuario, tipo, descripcion, fechaHora } = req.body;
    const conexion = req.app.get("dbConnection");
    
    // Primero verificamos si el horario sigue disponible
    const checkQuery = `
        SELECT disponible 
        FROM horarios_disponibles 
        WHERE fechaHora = ? AND disponible = true
    `;
    
    conexion.query(checkQuery, [fechaHora], (error, resultados) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        
        if(resultados.length === 0) {
            return res.status(400).json({message: "Horario no disponible"});
        }
        
        // Si está disponible, creamos la consulta y actualizamos el horario
        conexion.beginTransaction(err => {
            if(err) {
                return res.status(500).json({message: "Error en el servidor"});
            }
            
            const insertQuery = `
                INSERT INTO asesoramiento (idUsuario, tipo, descripcion, fechaHora)
                VALUES (?, ?, ?, ?)
            `;
            
            conexion.query(insertQuery, [idUsuario, tipo, descripcion, fechaHora], (error, resultado) => {
                if(error) {
                    return conexion.rollback(() => {
                        res.status(500).json({message: "Error en el servidor"});
                    });
                }
                
                const updateQuery = `
                    UPDATE horarios_disponibles 
                    SET disponible = false 
                    WHERE fechaHora = ?
                `;
                
                conexion.query(updateQuery, [fechaHora], (error) => {
                    if(error) {
                        return conexion.rollback(() => {
                            res.status(500).json({message: "Error en el servidor"});
                        });
                    }
                    
                    conexion.commit(err => {
                        if(err) {
                            return conexion.rollback(() => {
                                res.status(500).json({message: "Error en el servidor"});
                            });
                        }
                        res.status(201).json({
                            message: "Consulta creada exitosamente",
                            idConsulta: resultado.insertId
                        });
                    });
                });
            });
        });
    });
};