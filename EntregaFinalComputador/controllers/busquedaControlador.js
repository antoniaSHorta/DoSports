export const buscarGeneral = (req, res) => {
    const { termino } = req.query;
    const conexion = req.app.get("dbConnection");
    
    const searchTerm = `%${termino}%`;
    
    const queryNoticias = `
        SELECT 'noticia' as tipo, idNoticias as id, title as titulo, resumen, 
        DATE_FORMAT(date, '%d-%m-%Y') as fecha, image as imagen
        FROM noticias 
        WHERE title LIKE ? OR description LIKE ? OR resumen LIKE ?
    `;
    
    const queryActividades = `
        SELECT 'actividad' as tipo, idActividad as id, nombreActividad as titulo, 
        resumen, DATE_FORMAT(fechaActividad, '%d-%m-%Y') as fecha, '' as imagen
        FROM actividad 
        WHERE nombreActividad LIKE ? OR descripcion LIKE ? OR resumen LIKE ?
    `;

    const queryForos = `
        SELECT 'foro' as tipo, idForo as id, titulo, 
        descripcion as resumen, DATE_FORMAT(fechaCreacion, '%d-%m-%Y') as fecha, 
        '' as imagen
        FROM foro 
        WHERE titulo LIKE ? OR descripcion LIKE ?
    `;

    Promise.all([
        new Promise((resolve, reject) => {
            conexion.query(queryNoticias, [searchTerm, searchTerm, searchTerm], (error, resultados) => {
                if(error) reject(error);
                resolve(resultados);
            });
        }),
        new Promise((resolve, reject) => {
            conexion.query(queryActividades, [searchTerm, searchTerm, searchTerm], (error, resultados) => {
                if(error) reject(error);
                resolve(resultados);
            });
        }),
        new Promise((resolve, reject) => {
            conexion.query(queryForos, [searchTerm, searchTerm], (error, resultados) => {
                if(error) reject(error);
                resolve(resultados);
            });
        })
    ])
    .then(([noticiasResults, actividadesResults, forosResults]) => {
        const resultadosCombinados = [...noticiasResults, ...actividadesResults, ...forosResults]
            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        res.status(200).json(resultadosCombinados);
    })
    .catch(error => {
        console.log("ERROR EN LA CONSULTA", error);
        res.status(500).json({message: "Error en el servidor"});
    });
};