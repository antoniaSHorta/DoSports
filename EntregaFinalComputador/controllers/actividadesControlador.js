export const getActividades = (req, res) => {
    const conexion = req.app.get("dbConnection");
    
    const query = "SELECT idActividad, nombreActividad, descripcion, DATE_FORMAT(fechaActividad, '%Y-%m-%d') as fechaActividad, resumen FROM actividad ORDER BY fechaActividad DESC";
    conexion.query(query, (error, resultados) => {
        if(error){
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        res.status(200).json(resultados);
    });
};

export const inscribirActividad = (req, res) => {
    const { idUsuario, idActividad } = req.body;
    const conexion = req.app.get("dbConnection");

    const verificarQuery = "SELECT * FROM insactividad WHERE idUsuario = ? AND idActividad = ?";
    conexion.query(verificarQuery, [idUsuario, idActividad], (error, resultados) => {
        if(error){
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        
        if(resultados && resultados.length > 0){
            return res.status(400).json({message: "Ya estás inscrito en esta actividad"});
        }

        const insertQuery = "INSERT INTO insactividad (idUsuario, idActividad, fechaInscripcion) VALUES (?, ?, NOW())";
        conexion.query(insertQuery, [idUsuario, idActividad], (error, resultados) => {
            if(error){
                console.log("ERROR EN LA CONSULTA", error);
                return res.status(500).json({message: "Error en el servidor"});
            }
            res.status(201).json({message: "Inscripción exitosa"});
        });
    });
};

export const getActividad = (req, res) => {
    const { id } = req.params;
    const conexion = req.app.get("dbConnection");
    
    const query = "SELECT idActividad, nombreActividad, descripcion, DATE_FORMAT(fechaActividad, '%Y-%m-%d') as fechaActividad, resumen FROM actividad WHERE idActividad = ?";
    conexion.query(query, [id], (error, resultados) => {
        if(error){
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        if(resultados.length === 0){
            return res.status(404).json({message: "Actividad no encontrada"});
        }
        res.status(200).json(resultados[0]);
    });
};