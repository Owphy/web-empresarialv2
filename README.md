# Web Empresarial v2

Aplicación web empresarial con frontend en React y backend en Spring Boot. Utiliza MySQL como base de datos.

## Tecnologías

- Java
- Spring Boot
- Spring Security
- Maven
- React
- React Bootstrap
- MySQL

## Estructura

```text
web-empresarialv2/
├── BackEnd/
├── FrontEnd/
├── .gitignore
└── README.md
```

## Requisitos

- Java JDK instalado
- Node.js y npm
- MySQL
- Base de datos `webv2`

## Configuración de la base de datos

Crea la base de datos en MySQL:

```sql
CREATE DATABASE webv2;
```

Configura las credenciales en:

```text
BackEnd/src/main/resources/application.properties
```

Ejemplo:

```properties
spring.datasource.url=jdbc:
spring.datasource.username=
spring.datasource.password=
```

## Ejecutar el backend

Desde la carpeta `BackEnd`:

### Windows

```powershell
cd BackEnd
.\mvnw.cmd spring-boot:run
```

El backend estará disponible en:

```text
http://localhost:8080
```

Endpoint de usuarios:

```text
http://localhost:8080/api/usuarios
```

## Ejecutar el frontend

En otra terminal:

```powershell
cd FrontEnd
npm install
npm start
```

El frontend estará disponible en:

```text
http://localhost:3000
```

## Navegación

La aplicación incluye:

- `/` — Página principal
- `/login` — Inicio de sesión

## CORS

El backend permite peticiones desde:

```text
http://localhost:3000
```

Si el frontend utiliza otro puerto, actualiza la configuración CORS en el backend.

## Seguridad

No publiques contraseñas ni credenciales reales en Git. Usa archivos locales como:

```text
application-local.properties
```

y mantenlos incluidos en `.gitignore`.

## Estado del proyecto

Proyecto en desarrollo.