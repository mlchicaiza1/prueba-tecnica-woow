# Documento de Decisiones (DECISIONS.md)

## Arquitectura y Patrón de Diseño

El backend sigue una **arquitectura en N-capas (Layered Architecture)** complementada con el **patrón Repository** y el principio de **Inversión de Dependencias (DI)**.

El flujo de una petición sigue este camino:

```
Request → Middleware (Auth/Validation) → Controller → Service → Repository → Database
```

**Capas implementadas:**

| Capa | Responsabilidad | Ejemplo |
|------|----------------|---------|
| **Routes** | Definición de endpoints y asignación de middlewares | `authRoutes.ts`, `userRoutes.ts` |
| **Middlewares** | Autenticación JWT y validación de DTOs | `authMiddleware.ts`, `validationMiddleware.ts` |
| **Controllers** | Recibir la petición HTTP, delegar al servicio y formatear la respuesta | `authController.ts`, `userController.ts` |
| **Services** | Lógica de negocio (hashing, reglas de roles, paginación) | `authService.ts`, `userService.ts` |
| **Repositories** | Acceso a datos mediante TypeORM, desacoplados por interfaces | `userRepository.ts` → `IUserRepository` |
| **Models** | Entidades de TypeORM con decoradores | `User.ts` |
| **DTOs** | Objetos de transferencia de datos con validaciones | `CreateUserDto.ts`, `UpdateUserDto.ts`, `authDto.ts` |

**Inyección de Dependencias:** Se usa `tsyringe` como contenedor IoC para registrar e inyectar repositorios y servicios, lo que permite desacoplar las capas y facilita el testing o la sustitución de implementaciones sin modificar el código consumidor.

El frontend sigue una estructura estándar de React con **Context API** para la gestión del estado de autenticación, separando claramente: `pages/` (vistas), `components/` (reutilizables), `services/` (llamadas HTTP), `contexts/` (estado global) y `types/` (interfaces TS).

---

## ¿Por qué elegiste esas librerías?

### Backend
1. **TypeORM con PostgreSQL:** Facilita enormemente el mapeo de entidades relacionales con objetos TS. Reduce drásticamente la escritura manual de código SQL que es propenso a errores. En Typescript se adapta muy bien mediante el uso de decoradores y ofrece de por sí mitigación de inyecciones de SQL.
2. **tsyringe (Inyección de Dependencias):** Contenedor IoC ligero que permite registrar servicios y repositorios de forma desacoplada mediante decoradores (`@injectable`, `@inject`). Facilita la testabilidad y respeta el principio de inversión de dependencias.
3. **class-validator & class-transformer:** Permiten definir reglas de validación directamente en los DTOs mediante decoradores y transformar objetos planos del request en instancias de clase validables. Esto centraliza la lógica de validación en los propios modelos de entrada.
4. **jsonwebtoken & bcryptjs:** Imprescindibles para cualquier flujo de autenticación seguro basado en contraseñas cifradas y de acceso temporal con JWT.
5. **cors & dotenv:** Herramientas utilitarias para manejo del intercambio de recursos de distintos origenes y para configurar variables seguras.

### Frontend
1. **Vite + React + TypeScript:** Vite ofrece un servidor local que se levanta casi instantáneamente y tiempos de recompilación muy bajos gracias a HMR. React es la librería de vista por excelencia y se apoya en TS para validaciones de propiedades en los componentes de UI.
2. **React Router DOM:** Necesario para el enrutamiento client-side de SPA. Permite una navegación rápida y de bajo coste.
3. **Axios:** Cliente HTTP versátil que facilita enormemente el uso de "interceptores", una técnica clave en frontend para adjuntar tokens Bearers a todas las peticiones automáticamente o manejar errores 401 de forma central.
4. **TailwindCSS:** Para estilos rápidos, mantenibles y responsivos, aplicados usando clases utilitarias de forma directa, acelerando mucho la maquetación.

### DevOps
1. **Docker & Docker Compose:** Se incluyeron Dockerfiles multi-stage para backend (Node build → producción) y frontend (Vite build → Nginx), junto con un `docker-compose.yml` que orquesta los 3 servicios (PostgreSQL, API y SPA). Esto permite levantar todo el stack con un solo comando y elimina dependencias de instalación local.

## ¿Qué desafíos enfrentaste?

La implementacion de una arquitectura en N-capas con inyeccion de dependencias fue un desafio interesante, ya que requiere una planificacion cuidadosa de las dependencias entre las capas.

## ¿Qué mejorarías con más tiempo?

1. **Testings automatizados:** Usaría `Jest` para el backend
2. **Manejo de Errores centralizados en Backend:** En lugar de lanzar errores directos, crearía clases de Error Customizadas (ej: `NotFoundError()`, `UnauthorizedError()`) y lo controlaría mediante un `errorHandler` de Express.
3. **Separación de roles en la DB (Migrations):** Actualmente, usando `synchronize: true` de TypeORM está perfecto para una prueba, pero en un entorno profesional utilizaría Migraciones para rastrear los cambios en DD de base de datos.
4. **Agregar funcionalidad de recuperación de contraseña y verificación de correo electrónico.**
5. **Agregar un sistema de roles y permisos más robusto.** para cada endpoint.
6. **Frontend State Manager y Feedback:** Para un estado más complejo usaría `Redux Toolkit`, además de complementar la UI con `react-toastify` u otras formas para mejorar la experiencia de usuario (Feedback visual).

## ¿Cómo escalarías esta solución?

1. **Infraestructura:** Usaria CI/CD (GitHub Actions, GitLab CI) para automatizar el despliegue en la nube como aws o servidores de digital ocean, droplet, etc. 
2. **Caché:** Usaria Redis entre la petición del Front y los Servicios para cacheo de resultados frecuentes o validaciones costosas de tokens.

