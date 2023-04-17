# Digital Tech App

Este repositorio contiene un proyecto realizado en React Native con Expo. La aplicación utiliza las siguientes tecnologías:

- React.js + Hooks
- React context como state management para conectarse a la base de datos y manejo de publicaciones del usuario
- Una base de datos sqlite para guardar las publicaciones de los usuarios


## Funcionalidades

La aplicación cuenta con las siguientes funcionalidades:

- Registro o creación de nuevo usuario
- Login con username
- Opción para búsqueda y filtro de publicaciones
- Creación de nuevas publicaciones
- Funcionalidad para dar like a publicaciones
- Perfil de usuario
- Persistencia de datos para sesión de usuario y publicaciones
- La aplicación cuenta con una opción de "Recargar datos" la cual borra la base de datos y carga nuevamente el archivo JSON que se encuentra dentro de la aplicación
- Por tiempo no fue posible testear toda la aplicacion, pero se agrego un unit test simple al login para mostrar que el proyecto esta completamente configurado para poder seguir agregando mas test. para ejecutar solo se debe correr **npm test**

**Nota:** La aplicación solo puede ser ejecutada en Android y iOS ya que la base de datos no tiene soporte para la versión web.

## Cómo ejecutar la aplicación

- Para poder ejecutar la aplicación, se requiere tener instalado y configurado Expo(https://expo.dev/). Luego, para ejecutar la aplicación, se debe utilizar el comando npm start.

- La aplicación también fue publicada para poder descargar en Android o iOS desde: https://expo.dev/@byronap12/digital-tech-app?serviceType=classic&distribution=expo-go
