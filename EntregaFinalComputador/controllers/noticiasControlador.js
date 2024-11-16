export const getNoticias = (req, res) => {
    const conexion = req.app.get("dbConnection");

    const query = "SELECT idNoticias, title, description, DATE_FORMAT(date, '%Y-%m-%d') as date, resumen, image FROM noticias ORDER BY date DESC";
    conexion.query(query, (error, resultados) => {
        if (error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
        res.status(200).json(resultados);
    });
};

export const getNoticia = (req, res) => {
    const { id } = req.params;
    const conexion = req.app.get("dbConnection");

    const query = "SELECT idNoticias, title, description, DATE_FORMAT(date, '%Y-%m-%d') as date, resumen, image FROM noticias WHERE idNoticias = ?";
    conexion.query(query, [id], (error, resultados) => {
        if (error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ message: "Noticia no encontrada" });
        }
        res.status(200).json(resultados[0]);
    });
};

export const getNoticiasDestacadas = (req, res) => {
    const conexion = req.app.get("dbConnection");
    const query = "SELECT idNoticias, title, description, image, DATE_FORMAT(date, '%Y-%m-%d') as date, resumen FROM noticias ORDER BY date DESC LIMIT 3";
    
    conexion.query(query, (error, resultados) => {
        if (error) {
            console.log("ERROR EN LA CONSULTA", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
        res.status(200).json(resultados);
    });
};