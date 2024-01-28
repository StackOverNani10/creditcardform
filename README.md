# CreditCard Form

## Puntos realizados

### Primer bloque

### 1) Realizar maquetación del diseño suministrado y tomar en cuenta:

- [x] Todos los campos son requeridos.
- [x] El editar los campos de tarjetas, fecha y nombre modifica el diseño de la tarjeta.
- [x] El campo tarjeta solo puede contener números y un máximo de 16 caracteres.
- [x] El campo fecha de vencimiento debe tener formato mm/yy.
- [x] El campo fecha solo puede aceptar valores válidos para mes (01 a 12) y año (22 hasta año actual + 5).
- [x] El campo Nombre titular solo puede contener letras y letras con tildes y máximo de 20 caracteres.
- [x] En caso de que algún campo no sea válido se debe colocar texto en rojo debajo del campo indicando la causa de la invalidez.

### 2) Al pulsar botón de Agregar tarjeta.

- [x] Debe agregar la tarjeta a un bloque en el cual se mostrarán los campos de tarjeta, nombre y fecha vencimiento.
- [x] Para cada registro se debe contener un identificador único.
- [x] Debe validar que el formulario sea válido y que al no ser válido despliegue los textos en cada campo que no es válido.
- [x] El campo de número de tarjeta se debe mostrar enmascarado, solo mostrar los 2 primeros y 4 últimos dígitos (ej. 41**\*\*\*\***1234).

### 3) Al pulsar botón Cancelar se deben limpiar todos los campos.

### Segundo bloque

### 1) Crear RESTful API para el procesamiento de agregado/visualización de tarjetas.

- [x] Debe contener todos los métodos de CRUD. (aunque no los use todos)
- [x] Puede utilizar cualquier Web API de su preferencia (ej. Firebase, ASP .Net Core o MVC 5 en local host, Express, etc.)
- [x] Para la prueba no se tomará en cuenta ningún mecanismo de autenticación.

### 2) Conectar el primer bloque con el segundo bloque.

- [x] Al momento de agregar tarjeta esta debe ser almacenada en alguna base de datos o archivo de texto (ej. Firebase).
- [x] Lo único que se debe validar al momento de agregar es que los campos requeridos sean enviados.
- [x] Los API deben de devolver correctamente respuestas HTTP para cada caso, (ej. 404, 500, 302, 200, etc).

## Instrucciones para correr y probar el proyecto

### Por la Web

Para correr el proyecto puedes ingresar al siguiente link el cual le dirige a la aplicación desplegada en internet:
[Credit Card Form](https://creditcardform-ten.vercel.app)

### En Local

Para correr el código localmente debes seguir estos pasos:

- Clonar este repositorio o descargarlo como ZIP.
- Clonar o descargar el repositorio de la API Restful [aquí](https://github.com/StackOverNani10/api_creditcardform).
- Tener NodeJS instalado en tu ordenador. Puedes obtenerlo desde [aquí](https://nodejs.org/).

Para la API:

- Abrir una terminal en la carpeta raíz del proyecto.
- Correr `npm install` para instalar las dependencias necesarias.
- Correr `npm start` para iniciar el servidor de desarrollo.
- Ahora puedes abrir [http://localhost:3500](http://localhost:3500) en tu navegador web donde podrás ver funcionando la API.

Para la aplicación web:

- Abre/Ejecuta el index.html en un navegador para visualizar la aplicación web.
- Llena el formulario con los datos correspondientes.
- Presiona agregar para verificar los datos que desea agregar.
- Verifica abajo del formulario la tarjeta agregada con los datos colocados en el formulario.
