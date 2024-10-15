## DoSports
## Descripción

DoSports es una aplicación móvil híbrida diseñada para fomentar la participación en actividades deportivas dentro del entorno universitario.

A través de la aplicación, los miembros de la comunidad pueden inscribirse en diferentes actividades deportivas.

Además ofrece una sección dedicada a noticias deportivas de alcance nacional, manteniendo a los usuarios informados sobre los eventos más relevantes del deporte.

Incluyendo una sección de comunicación, donde los usuarios pueden solicitar asesoramiento y apoyo para adoptar o mantener un estilo de vida saludable en el contexto universitario.

<sub>Aplicación desarrollada en el curso de ingenieria web y móvil INF3245</sub>

## Tabla de Contenidos

1. [Análisis de las Funcionalidades](#análisisdelasfuncionalidades)
2. [Modelo de la base de datos](#Modelodelabasededatos)
3. [Prototipado Figma](#prototipadofigma)
4. [Maquetación Responsiva](#maquetaciónresponsiva)
5. [Tecnologías](#tecnologías)

## Análisis de las Funcionalidades

- Creación de perfil: El usuario podrá registrarse en la aplicación y asi obtener un perfil, en donde se guardara su registro.

- Inicio de sesión (Usuario/Administrador): La plataforma contendra un inicio de sesión donde se pedirá correo electronico y contraseña.

- Editar perfil:  El usuario tendra un menú de configuraciones, en este podrá visualizar su gestión de actividades, visualizar su solicitud de asesoramiento, eliminar su cuenta o modificar sus datos personales.
  
- Sección de noticias: DoSports contará con una sección de noticias, donde se podrán mantener informados los usuarios sobre las últimas novedades/actualizaciones del acontecer nacional de deportes, a través de la conexión con un sitio de noticias.

- Gestión de sesiones de asesoramiento: Los administradores tendrán la capacidad de gestionar sesiones a través de la aplicación, incluyendo la posibilidad de ofrecer horario disponible para realizar asesoramiento, cancelar un hora y confirmar nuevas horas.

- Solicitud de asesoramiento: Los usuarios tendran la opción de solicitar asesoramiento, esto se realizará a través del llenado de formulario, notificandolos en su correo cuando se les agende una hora.

- Buscador: Los usuarios podran buscar en la aplicación actividades específicas a través de una barra buscadora, esta no contempla filtros o categorias.

- Gestión de Actividades Deportivas (Usuario/Administrador): Los usuarios podrán gestionar sus actividades deportivas a través de la aplicación, lo que les permitirá inscribirse en nuevas actividades o eliminar su participación en las existentes.

- Foro: Donde los usuarios podrán discutir temas relacionados con deportes.

- Historial de actividades y sesiones: El usuario tendrá acceso a un historial de actividades deportivas en las que ha participado.

## Modelo de la base de datos

El motor de base de datos a ocupar es **MySQL**, ya que el sistema requiere la gestión de datos interrelacionados, como las actividades a las que un usuario se puede inscribir o las publicaciones que realiza en el foro, una base de datos relacionales como MySQL es ideal para esto.

Para la definición del modelo de base de datos, se ha diseñado un diagrama que incluye múltiples tablas relacionadas, las cuales están alineadas con los requerimientos funcionales del sistema mencionadas en el punto anterior. Las entidades principales del modelo son Usuario , Perfil , Actividad , Asesoramiento , Inscripción a Actividades , Publicación en Foro. hay que tener en cuenta que en la entidad **Usuario** el atributo **tipoUsuario** definira **si es administrador o no**, por ende **si es administrador el usuario podra gestionar: Noticias, Actividad, Foro y Asesoramiento.**

## Prototipado en Figma

[Prototipo Wireframe](https://www.figma.com/design/OhpDLO1HikjoKl7ndrjHzc/DoSports?node-id=11-27&t=rvU3IIRrJTx0IBBJ-1)

## Maquetación Responsiva
La aplicación será desarrollada con HTML5, CSS3 y JavaScript, utilizando frameworks como Bootstrap para la
maquetación responsiva.

## Tecnologías
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=flat&logo=ionic&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)



