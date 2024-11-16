-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2024 at 10:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dosports`
--

-- --------------------------------------------------------

--
-- Table structure for table `actividad`
--

CREATE TABLE `actividad` (
  `idActividad` int(11) NOT NULL,
  `nombreActividad` varchar(200) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `fechaActividad` date NOT NULL,
  `resumen` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actividad`
--

INSERT INTO `actividad` (`idActividad`, `nombreActividad`, `descripcion`, `fechaActividad`, `resumen`) VALUES
(1, 'Torneo de Fútbol 7', '¡Únete a nuestro emocionante Torneo de Fútbol 7! Esta actividad está diseñada para jugadores de todos los niveles, desde principiantes hasta expertos. El torneo se llevará a cabo el próximo mes en el campo deportivo local, y se jugará en equipos de siete jugadores. Cada equipo competirá en una serie de partidos para alcanzar la final. Además de fomentar el deporte y la competencia amistosa, el evento ofrecerá premios para los mejores equipos y un ambiente festivo para todos los participantes. La inscripción está abierta hasta el [10 de Noviembre], así que no pierdas la oportunidad de ser parte de esta experiencia inolvidable. ¡Forma tu equipo y regístrate ya!¡Únete a nuestro emocionante Torneo de Fútbol 7! Esta actividad está diseñada para jugadores de todos los niveles, desde principiantes hasta expertos. El torneo se llevará a cabo el próximo mes en el campo deportivo local, y se jugará en equipos de siete jugadores. Cada equipo competirá en una serie de partidos para alcanzar la fin', '2024-11-12', 'Resumen de la actividad 1'),
(2, 'Clases de Yoga al Aire Libre', 'Participa en nuestras Clases de Yoga al Aire Libre, diseñadas para todos los niveles de experiencia, desde principiantes hasta practicantes avanzados. Las sesiones se llevarán a cabo en un hermoso parque local todos los sábados por la mañana. Con la guía de un instructor certificado, disfrutarás de una práctica que combina movimientos suaves, técnicas de respiración y meditación, todo en un entorno natural que promueve la paz y la relajación. Además, estas clases son una excelente oportunidad para socializar y conectar con la comunidad. La inscripción es gratuita, pero los espacios son limitados. ¡Asegúrate de reservar tu lugar y traer tu mat de yoga!', '2024-11-30', 'Resumen de la actividad 2');

-- --------------------------------------------------------

--
-- Table structure for table `asesoramiento`
--

CREATE TABLE `asesoramiento` (
  `idConsulta` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fechaHora` datetime NOT NULL,
  `estado` enum('pendiente','confirmada','completada') DEFAULT 'pendiente',
  `respuesta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `asesoramiento`
--

INSERT INTO `asesoramiento` (`idConsulta`, `idUsuario`, `tipo`, `descripcion`, `fechaHora`, `estado`, `respuesta`) VALUES
(1, 1, 'lesiones', 'dsadasdasd', '2024-11-22 15:00:00', 'pendiente', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `foro`
--

CREATE TABLE `foro` (
  `idForo` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text NOT NULL,
  `fechaCreacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foro`
--

INSERT INTO `foro` (`idForo`, `titulo`, `descripcion`, `fechaCreacion`) VALUES
(1, 'Fútbol', 'ForoFutbolero Pro™ es la comunidad virtual donde apasionados del balompié de todo el mundo se reúnen para debatir, compartir noticias, análisis tácticos y revivir los momentos más emocionantes del deporte rey. Desde debates acalorados sobre Messi vs. Ronaldo, hasta rumores del mercado de fichajes, aquí todos los fanáticos tienen un espacio.', '2024-11-16 18:09:48');

-- --------------------------------------------------------

--
-- Table structure for table `historialactividad`
--

CREATE TABLE `historialactividad` (
  `idHistorial` int(11) NOT NULL,
  `fechaActividad` date NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `estado` varchar(200) NOT NULL,
  `idInscripcion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `horarios_disponibles`
--

CREATE TABLE `horarios_disponibles` (
  `idHorario` int(11) NOT NULL,
  `fechaHora` datetime NOT NULL,
  `disponible` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `horarios_disponibles`
--

INSERT INTO `horarios_disponibles` (`idHorario`, `fechaHora`, `disponible`) VALUES
(17, '2024-11-26 09:00:00', 1),
(18, '2024-12-06 09:00:00', 1),
(19, '2024-12-16 09:00:00', 1),
(20, '2024-12-26 09:00:00', 1),
(21, '2024-11-27 10:00:00', 1),
(22, '2024-12-17 10:00:00', 1),
(23, '2024-12-27 10:00:00', 1),
(24, '2024-11-18 11:00:00', 1),
(25, '2024-11-28 11:00:00', 1),
(26, '2024-12-18 11:00:00', 1),
(27, '2024-11-19 12:00:00', 1),
(28, '2024-11-29 12:00:00', 1),
(29, '2024-12-09 12:00:00', 1),
(30, '2024-12-19 12:00:00', 1),
(31, '2024-11-20 13:00:00', 1),
(32, '2024-12-10 13:00:00', 1),
(33, '2024-12-20 13:00:00', 1),
(34, '2024-12-30 13:00:00', 1),
(35, '2024-11-21 14:00:00', 1),
(36, '2024-12-11 14:00:00', 1),
(37, '2024-12-31 14:00:00', 1),
(38, '2024-11-22 15:00:00', 0),
(39, '2024-12-02 15:00:00', 1),
(40, '2024-12-12 15:00:00', 1),
(41, '2025-01-01 15:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `insactividad`
--

CREATE TABLE `insactividad` (
  `idInscripcion` int(11) NOT NULL,
  `fechaInscripcion` date NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idActividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `insactividad`
--

INSERT INTO `insactividad` (`idInscripcion`, `fechaInscripcion`, `idUsuario`, `idActividad`) VALUES
(1, '2024-11-16', 1, 2),
(2, '2024-11-16', 1, 1),
(3, '2024-11-16', 3, 2),
(4, '2024-11-16', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `noticias`
--

CREATE TABLE `noticias` (
  `idNoticias` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `image` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `resumen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `noticias`
--

INSERT INTO `noticias` (`idNoticias`, `title`, `description`, `image`, `date`, `resumen`) VALUES
(2, 'Título de la noticia 1', 'En un partido lleno de tensión, el equipo local logró hacerse con el título de campeón de la liga de', 'https://ionicframework.com/docs/img/demos/thumbnail.svg', '2024-11-14', 'Resumen de la noticia 1'),
(3, 'Título de la noticia 2', 'En un emocionante partido jugado en el Estadio Nacional, el equipo nacional se enfrentó a su rival tradicional y salió victorioso con un marcador de 3-1. Los goles fueron anotados por el delantero estrella, quien demostró su habilidad y liderazgo en el campo. Con esta victoria, el equipo no solo avanza a la siguiente fase del torneo, sino que también reafirma su posición como uno de los favoritos para llevarse el trofeo. Los aficionados celebraron con entusiasmo, y la ciudad se llenó de banderas y cánticos en honor a los jugadores.', 'https://ionicframework.com/docs/img/demos/thumbnail.svg', '2024-11-06', 'Resumen de la noticia 2');

-- --------------------------------------------------------

--
-- Table structure for table `publicacionforo`
--

CREATE TABLE `publicacionforo` (
  `idPublicacion` int(11) NOT NULL,
  `tituloPublicacion` varchar(200) DEFAULT NULL,
  `contenido` text NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `idUsuario` int(11) NOT NULL,
  `idForo` int(11) NOT NULL,
  `idComentarioPadre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publicacionforo`
--

INSERT INTO `publicacionforo` (`idPublicacion`, `tituloPublicacion`, `contenido`, `fecha`, `idUsuario`, `idForo`, `idComentarioPadre`) VALUES
(1, 'hola', 'futbol', '2024-11-16 18:15:11', 3, 1, NULL),
(2, NULL, 'hola si', '2024-11-16 18:19:47', 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `region` varchar(100) NOT NULL,
  `comuna` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `region`, `comuna`, `nombre`, `correo`, `contrasena`) VALUES
(1, 'valparaiso', 'viña del mar', 'pepito', 'pepito@gmail.com', '123'),
(2, 'Antofagasta', 'antofagasta', 'admin', 'admin@gmail.com', '123456'),
(3, 'Maule', 'maule', 'hola', 'hola@gmail.com', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`idActividad`);

--
-- Indexes for table `asesoramiento`
--
ALTER TABLE `asesoramiento`
  ADD PRIMARY KEY (`idConsulta`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `foro`
--
ALTER TABLE `foro`
  ADD PRIMARY KEY (`idForo`);

--
-- Indexes for table `historialactividad`
--
ALTER TABLE `historialactividad`
  ADD PRIMARY KEY (`idHistorial`),
  ADD KEY `fk_idInscripcion` (`idInscripcion`);

--
-- Indexes for table `horarios_disponibles`
--
ALTER TABLE `horarios_disponibles`
  ADD PRIMARY KEY (`idHorario`);

--
-- Indexes for table `insactividad`
--
ALTER TABLE `insactividad`
  ADD PRIMARY KEY (`idInscripcion`),
  ADD KEY `fk_idUsuarioInscripcion` (`idUsuario`),
  ADD KEY `fk_idActividadInscripcion` (`idActividad`);

--
-- Indexes for table `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`idNoticias`);

--
-- Indexes for table `publicacionforo`
--
ALTER TABLE `publicacionforo`
  ADD PRIMARY KEY (`idPublicacion`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idForo` (`idForo`),
  ADD KEY `idComentarioPadre` (`idComentarioPadre`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividad`
--
ALTER TABLE `actividad`
  MODIFY `idActividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `asesoramiento`
--
ALTER TABLE `asesoramiento`
  MODIFY `idConsulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `foro`
--
ALTER TABLE `foro`
  MODIFY `idForo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `historialactividad`
--
ALTER TABLE `historialactividad`
  MODIFY `idHistorial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `horarios_disponibles`
--
ALTER TABLE `horarios_disponibles`
  MODIFY `idHorario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `insactividad`
--
ALTER TABLE `insactividad`
  MODIFY `idInscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `noticias`
--
ALTER TABLE `noticias`
  MODIFY `idNoticias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `publicacionforo`
--
ALTER TABLE `publicacionforo`
  MODIFY `idPublicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `asesoramiento`
--
ALTER TABLE `asesoramiento`
  ADD CONSTRAINT `asesoramiento_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);

--
-- Constraints for table `historialactividad`
--
ALTER TABLE `historialactividad`
  ADD CONSTRAINT `fk_idInscripcion` FOREIGN KEY (`idInscripcion`) REFERENCES `insactividad` (`idInscripcion`);

--
-- Constraints for table `insactividad`
--
ALTER TABLE `insactividad`
  ADD CONSTRAINT `fk_idActividadInscripcion` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`idActividad`),
  ADD CONSTRAINT `fk_idUsuarioInscripcion` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);

--
-- Constraints for table `publicacionforo`
--
ALTER TABLE `publicacionforo`
  ADD CONSTRAINT `publicacionforo_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `publicacionforo_ibfk_2` FOREIGN KEY (`idForo`) REFERENCES `foro` (`idForo`),
  ADD CONSTRAINT `publicacionforo_ibfk_3` FOREIGN KEY (`idComentarioPadre`) REFERENCES `publicacionforo` (`idPublicacion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
