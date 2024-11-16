export const getHistorialUsuario = (req, res) => {
  const { idUsuario } = req.params;
  const conexion = req.app.get("dbConnection");
  
  const query = `
      SELECT 
          a.idActividad,
          a.nombreActividad,
          DATE_FORMAT(a.fechaActividad, '%Y-%m-%d') as fechaActividad,
          CASE 
              WHEN a.fechaActividad < CURDATE() THEN 'Terminada'
              ELSE 'Pendiente'
          END as estado
      FROM insactividad i
      JOIN actividad a ON i.idActividad = a.idActividad
      WHERE i.idUsuario = ?
      ORDER BY a.fechaActividad DESC
  `;
  
  conexion.query(query, [idUsuario], (error, resultados) => {
      if(error) {
          console.log("ERROR EN LA CONSULTA", error);
          return res.status(500).json({message: "Error en el servidor"});
      }
      res.status(200).json(resultados);
  });
};