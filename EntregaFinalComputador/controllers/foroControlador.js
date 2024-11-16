export const getForos = (req, res) => {
    const conexion = req.app.get("dbConnection");
    const query = "SELECT * FROM foro ORDER BY idForo";
    
    conexion.query(query, (error, foros) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        res.status(200).json(foros);
    });
};

export const getPostsByForo = (req, res) => {
    const { idForo } = req.params;
    const conexion = req.app.get("dbConnection");
    
    const query = `
        SELECT p.*, u.nombre as nombreUsuario,
        (SELECT COUNT(*) FROM publicacionforo WHERE idComentarioPadre = p.idPublicacion) as numComentarios
        FROM publicacionforo p 
        JOIN usuarios u ON p.idUsuario = u.idUsuario 
        WHERE p.idForo = ? AND p.idComentarioPadre IS NULL
        ORDER BY p.fecha DESC
    `;
    
    conexion.query(query, [idForo], (error, posts) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        res.status(200).json(posts);
    });
};

export const getComentarios = (req, res) => {
    const { idPublicacion } = req.params;
    const conexion = req.app.get("dbConnection");
    
    const query = `
        SELECT p.*, u.nombre as nombreUsuario
        FROM publicacionforo p 
        JOIN usuarios u ON p.idUsuario = u.idUsuario 
        WHERE p.idComentarioPadre = ?
        ORDER BY p.fecha ASC
    `;
    
    conexion.query(query, [idPublicacion], (error, comentarios) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error en el servidor"});
        }
        res.status(200).json(comentarios);
    });
};

export const createPost = (req, res) => {
    const { tituloPublicacion, contenido, idUsuario, idForo } = req.body;
    const conexion = req.app.get("dbConnection");

    const insertQuery = `
        INSERT INTO publicacionforo (tituloPublicacion, contenido, idUsuario, idForo) 
        VALUES (?, ?, ?, ?)
    `;
    
    conexion.query(insertQuery, [tituloPublicacion, contenido, idUsuario, idForo], (error, result) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error al crear el post"});
        }
        res.status(201).json({
            message: "Post creado exitosamente",
            idPublicacion: result.insertId
        });
    });
};

export const createComentario = (req, res) => {
    const { contenido, idUsuario, idComentarioPadre, idForo } = req.body;
    const conexion = req.app.get("dbConnection");

    const insertQuery = `
        INSERT INTO publicacionforo (contenido, idUsuario, idComentarioPadre, idForo) 
        VALUES (?, ?, ?, ?)
    `;
    
    conexion.query(insertQuery, [contenido, idUsuario, idComentarioPadre, idForo], (error, result) => {
        if(error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({message: "Error al crear el comentario"});
        }
        res.status(201).json({
            message: "Comentario creado exitosamente",
            idPublicacion: result.insertId
        });
    });
};