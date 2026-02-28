# WoowTechnology - Prueba Técnica (Full-Stack)

Este proyecto es una aplicación web Full-Stack construida para satisfacer los requerimientos de la prueba técnica solicitada por **WoowTechnology**. El sistema proporciona una REST API para la gestión de usuarios combinada con una SPA (Single Page Application).

##  Prerrequisitos (Entorno Local)

Para ejecutar este proyecto, se necesita tener instalado en la máquina:

- **Node.js** (v18.0 o superior)
- **npm** o yarn/pnpm
- **PostgreSQL** corriendo localmente o mediante un contenedor Docker.

## Base de Datos

No se requiere de archivo  `schema.sql` porque **se ha implementado ORM con TypeORM** en el backend.

1. Desde el administrador local de PostgreSQL (Ej. pgAdmin, o usando psql desde la CLI).
2. Crea una base de datos vacía. Por defecto el proyecto buscará una base de nombre `woow_db`. 
   `CREATE DATABASE woow_db;`
3. Al iniciar el servidor backend, el ORM se encarga por su cuenta de crear la tabla `users` automáticamente usando los modelos establecidos de TypeORM.

---

## Ejecución con Docker Compose (Recomendado)

- **Docker** (v20.0 o superior)
- **Docker Compose** (v2.0 o superior)

La forma más sencilla de levantar el proyecto completo (base de datos, backend y frontend) es usando Docker Compose. Con un solo comando se construyen y ejecutan los 3 servicios:

```bash
docker compose up --build -d
```

Esto levantará:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:8080 | Aplicación React servida con Nginx |
| **Backend API** | http://localhost:3000/api | API REST con Express |
| **PostgreSQL** | localhost:5433 | Base de datos (puerto 5433 en el host) |

La base de datos se inicializa automáticamente con los scripts `schema.sql` y `seed.sql` ubicados en `backend/database/`.

**Credenciales precargadas por el seed:**
- Admin: `admin@example.com` / `password123`
- User: `user@example.com` / `password123`

**Comandos útiles:**

```bash
# Ver los logs de los contenedores
docker compose logs -f

# Detener los servicios
docker compose down

# Detener y eliminar los volúmenes (reiniciar la DB desde cero)
docker compose down -v
```

---

## Instrucciones de Instalación y Ejecución Local (Sin Docker)

El repositorio incluye dos carpetas: `backend/` y `frontend/`. Debes abrir **dos terminales separadas** e inicializar ambos de forma simultánea.

### 1. Configurando el Backend (API REST)

Abre un terminal y sitúate en la raíz del repositorio.

```bash
cd backend
```

**Instalación:**
```bash
npm install
```

**Configuración de Variables de Entorno:**
Renombra (o copia) el archivo `.env.example` en `.env` (si no ha sido copiado)
```bash
cp .env.example .env
```
Este archivo ya viene con la configuración estándar para una conexión local de Postgre (`localhost:5432 / postgres:postgres`). Cámbialo si los credenciales de tu DB son distintos.

**Ejecución en modo Desarrollo:**
```bash
npm run dev
```
La terminal indicará:
`Data Source has been initialized!` y `Server is running on http://localhost:3000`

### 2. Configurando el Frontend (React App)

Abre una *nueva* terminal y sitúate en la raíz del repositorio.

```bash
cd frontend
```

**Instalación:**
```bash
npm install
```

**Configuración de Variables de Entorno:**
Renombra (o copia) el archivo `.env.example` en `.env` (si no ha sido copiado)
```bash
cp .env.example .env
```

**Ejecución en modo Desarrollo:**
```bash
npm run dev
```

La consola mostrará el enlace local de despliegue, generalmente `http://localhost:5173`. Ingresa allí a través del navegador web.

---

## Endpoints disponibles (Backend)

Todos los endpoints tienen el prefijo base `http://localhost:3000/api` y asumen un Content-Type `application/json`.

### Autenticación y Cuentas Públicas
- `POST /auth/register` (Registra un usuario).
  - Body de ejemplo: `{ "name": "Admin", "email": "admin@woow.com", "password": "password123", "role": "admin" }` (Nota: en la UI regular no proveemos un campo `role` por motivos de simplicidad, pero se puede simular vía app como Postman u REST Client).
- `POST /auth/login` (Autentica credenciales).
  - Body de ejemplo: `{ "email": "admin@woow.com", "password": "password123" }`
  - Respuesta: Payload con Información de usuario y `token` JWT

### Cuentas Privadas (Requieren CABECERA HTTP `Authorization: Bearer <TOKEN>`)
- `GET /users/me` (Obtener información de perfil del usuario logueado).
- `PUT /users/me` (Actualizar el perfil).
  - Body de ejemplo: `{ "name": "Nuevo Nombre" }`
- `GET /users` (Lista a todos los usuarios; *Únicamente el perfil debe contar con role="admin"*).

---

## Credenciales de prueba

Se recomienda registrar los perfiles de 'user' y 'admin' por el  API

**Paso sugerido (Usando Postman):**

1. Como Administrador (POST /api/auth/register):
```json
{
  "name": "Administrador Woow",
  "email": "admin@woow.com",
  "password": "password123",
  "role": "admin"
}
```
2. Como Usuario Normal (POST /api/auth/register):
```json
{
  "name": "Usuario Tester",
  "email": "tester@woow.com",
  "password": "password123"
}
```


