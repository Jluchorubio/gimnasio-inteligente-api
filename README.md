# Gimnasio Inteligente API + Frontend

Proyecto académico full stack para gestión de gimnasio con:
- API REST en Node.js + Express
- Base de datos PostgreSQL
- Frontend en HTML + Tailwind + Vanilla JS (Fetch API)

## Tabla de contenido
1. [Resumen](#resumen)
2. [Stack y arquitectura](#stack-y-arquitectura)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Requisitos](#requisitos)
5. [Variables de entorno](#variables-de-entorno)
6. [Configuración local](#configuración-local)
7. [Uso del frontend](#uso-del-frontend)
8. [Endpoints API](#endpoints-api)
9. [Despliegue en Render](#despliegue-en-render)
10. [Validación post-deploy](#validación-post-deploy)
11. [Troubleshooting](#troubleshooting)

## Resumen
El sistema permite administrar:
- Usuarios
- Entrenadores
- Rutinas
- Ejercicios
- Progreso físico
- Relaciones N:M (`usuario_rutina`, `rutina_ejercicio`)

Además incluye vistas frontend que consumen la API para mostrar tablas y tarjetas dinámicas.

## Stack y arquitectura
### Backend
- Node.js
- Express 4
- `pg` (PostgreSQL)
- Arquitectura por capas:
  - `routes/`
  - `controllers/`
  - `models/`
  - `config/`

### Frontend
- HTML semántico
- Tailwind CSS (CDN)
- CSS personalizado (`frontend/css/styles.css`)
- JavaScript modular (ES Modules + Fetch API)

## Estructura del proyecto
```text
gimnasio-inteligente-api/
|- app.js
|- package.json
|- BD.psql
|- config/
|  |- db.js
|- controllers/
|  |- usuario.controller.js
|  |- entrenador.controller.js
|  |- rutina.controller.js
|  |- ejercicio.controller.js
|  |- rutinaEjercicio.controller.js
|  |- usuarioRutina.controller.js
|  |- progreso.controller.js
|- models/
|  |- usuario.model.js
|  |- entrenador.model.js
|  |- rutina.model.js
|  |- ejercicio.model.js
|  |- rutinaEjercicio.model.js
|  |- usuarioRutina.model.js
|  |- progreso.model.js
|- routes/
|  |- usuario.routes.js
|  |- entrenador.routes.js
|  |- rutina.routes.js
|  |- ejercicio.routes.js
|  |- rutinaEjercicio.routes.js
|  |- usuarioRutina.routes.js
|  |- progreso.routes.js
|- frontend/
|  |- index.html
|  |- usuarios.html
|  |- entrenadores.html
|  |- rutinas.html
|  |- ejercicios.html
|  |- progreso.html
|  |- css/
|  |  |- styles.css
|  |- js/
|     |- main.js
|     |- ui.js
|     |- api/
|     |  |- config.js
|     |  |- usuario.api.js
|     |  |- entrenador.api.js
|     |  |- rutina.api.js
|     |  |- ejercicio.api.js
|     |  |- progreso.api.js
|     |- pages/
|        |- usuarios.js
|        |- entrenadores.js
|        |- rutinas.js
|        |- ejercicios.js
|        |- progreso.js
```

## Requisitos
- Node.js 18+
- npm 9+
- PostgreSQL 14+

## Variables de entorno
Crear archivo `.env` en raíz del proyecto.

### Local (sin `DATABASE_URL`)
```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=gimnasio_inteligente
DB_PORT=5432
```

### Producción (Render)
```env
PORT=10000
DATABASE_URL=postgresql://usuario:password@host:puerto/database
```

Notas:
- Si `DATABASE_URL` existe, `config/db.js` usa esa conexión con SSL.
- Si no existe, usa variables `DB_*` para desarrollo local.

## Configuración local
### 1) Instalar dependencias
```bash
npm install
```

### 2) Crear base de datos y tablas
Ejecuta el script `BD.psql` en PostgreSQL.

### 3) Iniciar servidor
```bash
npm run dev
```
o
```bash
npm start
```

### 4) Probar
- API health/frontend: `http://localhost:3000/`
- Usuarios API: `http://localhost:3000/api/usuarios`

## Uso del frontend
- El frontend se sirve de forma estática desde `app.js` con `express.static`.
- Navega por:
  - `http://localhost:3000/` (landing)
  - `http://localhost:3000/usuarios.html`
  - `http://localhost:3000/entrenadores.html`
  - `http://localhost:3000/rutinas.html`
  - `http://localhost:3000/ejercicios.html`
  - `http://localhost:3000/progreso.html`

Configuración de API en frontend:
- Archivo: `frontend/js/api/config.js`
- Prioridad de base URL:
  1. `window.GIMNASIO_API_BASE_URL` (si defines override manual)
  2. `window.location.origin` (si estás en dominio Render del proyecto)
  3. `https://gimnasio-inteligente-api.onrender.com` (fallback)

## Endpoints API
Base local: `http://localhost:3000`

### Salud
- `GET /`

### Usuarios
- `GET /api/usuarios`
- `GET /api/usuarios/:id`
- `POST /api/usuarios`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`
- `GET /api/usuarios/:id/rutinas`
- `GET /api/usuarios/:id/progreso-mensual`

### Entrenadores
- `GET /api/entrenadores`
- `GET /api/entrenadores/:id`
- `POST /api/entrenadores`
- `PUT /api/entrenadores/:id`
- `DELETE /api/entrenadores/:id`
- `GET /api/entrenadores/:id/rutinas`

### Rutinas
- `GET /api/rutinas`
- `GET /api/rutinas/detalle/con-entrenador`
- `GET /api/rutinas/:id`
- `POST /api/rutinas`
- `PUT /api/rutinas/:id`
- `DELETE /api/rutinas/:id`
- `GET /api/rutinas/:id/ejercicios`

### Ejercicios
- `GET /api/ejercicios`
- `GET /api/ejercicios/:id`
- `POST /api/ejercicios`
- `PUT /api/ejercicios/:id`
- `DELETE /api/ejercicios/:id`

### Progreso
- `GET /api/progresos`
- `GET /api/progresos/:id`
- `POST /api/progresos`
- `PUT /api/progresos/:id`
- `DELETE /api/progresos/:id`

### Relación Rutina-Ejercicio
- `GET /api/rutina-ejercicio`
- `POST /api/rutina-ejercicio`
- `PUT /api/rutina-ejercicio/:id_rutina/:id_ejercicio`
- `DELETE /api/rutina-ejercicio/:id_rutina/:id_ejercicio`

### Relación Usuario-Rutina
- `GET /api/usuario-rutina`
- `POST /api/usuario-rutina`
- `PUT /api/usuario-rutina/:id_usuario/:id_rutina`
- `DELETE /api/usuario-rutina/:id_usuario/:id_rutina`

## Despliegue en Render
### A) Base de datos (PostgreSQL)
1. En Render: `New` -> `PostgreSQL`.
2. Crea instancia.
3. Copia `Internal Database URL` o `External Database URL`.

### B) Web Service (Node)
1. `New` -> `Web Service`.
2. Conecta tu repo GitHub.
3. Configura:
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Branch: `main`
   - Root Directory: vacío (raíz del repo)

### C) Variables de entorno en Render
En `Environment` del servicio agrega:
- `DATABASE_URL` = URL de PostgreSQL Render
- `NODE_ENV` = `production` (opcional)

No definas `PORT` manualmente (Render la inyecta).

### D) Deploy
- Cada `git push origin main` dispara deploy automático.
- Si no corre: `Manual Deploy` -> `Deploy latest commit`.
- Si hay cache inconsistente: `Manual Deploy` -> `Clear build cache & deploy`.

### E) Comandos de publicación recomendados
```bash
git add .
git commit -m "deploy: update backend/frontend"
git push origin main
```

## Validación post-deploy
1. Abre la raíz de tu servicio:
   - `https://TU-SERVICIO.onrender.com/`
   - Debe cargar `index.html`.
2. Verifica endpoint:
   - `https://TU-SERVICIO.onrender.com/api/usuarios`
   - Debe devolver JSON.
3. En navegador, revisa `Network`:
   - Las peticiones `fetch` deben ir al mismo dominio correcto.
   - Respuestas sin errores CORS.

## Troubleshooting
### 1) `Failed to fetch` en frontend
Causas comunes:
- Servicio viejo/desactualizado en Render.
- Frontend apuntando a otro dominio API.
- CORS ausente en deploy activo.

Acciones:
1. Confirmar URL de API en `frontend/js/api/config.js`.
2. Confirmar que solo usas el dominio correcto del servicio actual.
3. Revisar headers CORS en la respuesta.
4. Hacer `Clear build cache & deploy`.

### 2) Endpoint `/` muestra JSON en vez de HTML
- Significa que el deploy activo no tiene la versión más reciente de `app.js`.
- Verifica branch y último commit desplegado en Render.

### 3) El frontend carga pero no renderiza datos en una vista
- Revisar que cada HTML apunte a su script correcto en `js/pages/*.js`.
- Revisar IDs de contenedores usados por JS.
- Revisar consola del navegador por errores de módulo/import.

### 4) Error de conexión a PostgreSQL
- Verifica `DATABASE_URL` en Render.
- Verifica schema/tablas ejecutando `BD.psql`.
- Revisa logs de runtime en Render.

---
Proyecto académico desarrollado para práctica de arquitectura API REST + frontend modular.
