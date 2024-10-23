## DoSports
## Descripción

DoSports es una aplicación móvil híbrida diseñada para fomentar la participación en actividades deportivas dentro del entorno universitario.

A través de la aplicación, los miembros de la comunidad pueden inscribirse en diferentes actividades deportivas.

Además ofrece una sección dedicada a noticias deportivas, manteniendo a los usuarios informados sobre los eventos más relevantes del deporte.

Incluyendo una sección de comunicación, donde los usuarios pueden solicitar asesoramiento y apoyo para adoptar o mantener un estilo de vida saludable en el contexto universitario.

<sub>Aplicación desarrollada en el curso de ingenieria web y móvil INF3245</sub>

## En la pagina de inicio se trabaja con Swiper, por ende, se necesita de instalación: npm install swiper.

## Tabla de Contenidos

1. [Funcionalidades](#funcionalidades)
2. [Propuesta y Justificación](#propuesta-y-justificación)
3. [Tecnologías](#tecnologías)


## Funcionalidades

- Creación de perfil.

- Inicio de sesión.
  
- Sección de noticias.
  
- Asesoramiento.

- Buscador.

- Inscripción de Actividad.

- Información de Actividades.

- Foro.

- Historial de actividades.

## Propuesta y Justificación

Trabajaremos con una base de datos relacional y como motor de base de datos a ocupar es **MySQL**, ya que el sistema requiere la gestión de datos interrelacionados, como las actividades a las que un usuario se puede inscribir o las publicaciones que realiza en el foro, una base de datos relacionales como MySQL es ideal para esto.

Para la definición del modelo de base de datos, se ha diseñado un diagrama que incluye múltiples tablas relacionadas, las cuales están alineadas con los requerimientos del sistema mencionadas en el punto anterior. Las entidades principales del modelo son Usuario , Actividad , Asesoramiento , Inscripción a Actividades, Noticias, Publicación en Foro y Historial. 

**MySQL** es especialmente adecuado porque permite garantizar la integridad referencial entre las entidades a través de claves foráneas, manteniendo datos consistentes y evitando duplicaciones. Además, soporta consultas SQL complejas que son clave para funcionalidades como el buscador y el historial de actividades, mientras que su escalabilidad y rendimiento aseguran que la aplicación pueda crecer sin comprometer la eficiencia. Finalmente, MySQL ofrece robustas características de seguridad, protegiendo los datos sensibles de los usuarios, lo que es fundamental para una aplicación móvil como **DoSports**.

[Modelo de la BD](SegundaEntrega/Dosports/MER.jpeg)


[Esquema Relaciona](SegundaEntrega/Dosports/ER.jpeg)

## Tecnologías
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=flat&logo=ionic&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)



