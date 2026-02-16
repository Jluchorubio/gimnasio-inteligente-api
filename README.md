# Gimnasio Inteligente API

API REST desarrollada con Node.js, Express y MySQL.

Arquitectura por capas:
- Routes
- Controllers
- Models
- Config

---

# Estructura del proyecto

```text
gimnasio-inteligente-api/
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
|- .env
|- app.js
|- package.json
|- README.md
```

---

# Endpoints disponibles

Base URL:
- `http://localhost:3000`

## Salud de la API
- `GET /`

## Usuarios
- `GET /api/usuarios`
- `GET /api/usuarios/:id`
- `POST /api/usuarios`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`
- `GET /api/usuarios/:id/rutinas`
- `GET /api/usuarios/:id/progreso-mensual`

## Entrenadores
- `GET /api/entrenadores`
- `GET /api/entrenadores/:id`
- `POST /api/entrenadores`
- `PUT /api/entrenadores/:id`
- `DELETE /api/entrenadores/:id`
- `GET /api/entrenadores/:id/rutinas`

## Rutinas
- `GET /api/rutinas`
- `GET /api/rutinas/detalle/con-entrenador`
- `GET /api/rutinas/:id`
- `POST /api/rutinas`
- `PUT /api/rutinas/:id`
- `DELETE /api/rutinas/:id`
- `GET /api/rutinas/:id/ejercicios`

## Ejercicios
- `GET /api/ejercicios`
- `GET /api/ejercicios/:id`
- `POST /api/ejercicios`
- `PUT /api/ejercicios/:id`
- `DELETE /api/ejercicios/:id`

## Progresos
- `GET /api/progresos`
- `GET /api/progresos/:id`
- `POST /api/progresos`
- `PUT /api/progresos/:id`
- `DELETE /api/progresos/:id`

## Relacion Rutina-Ejercicio (N:M)
- `GET /api/rutina-ejercicio`
- `POST /api/rutina-ejercicio`
- `PUT /api/rutina-ejercicio/:id_rutina/:id_ejercicio`
- `DELETE /api/rutina-ejercicio/:id_rutina/:id_ejercicio`

## Relacion Usuario-Rutina (N:M)
- `GET /api/usuario-rutina`
- `POST /api/usuario-rutina`
- `PUT /api/usuario-rutina/:id_usuario/:id_rutina`
- `DELETE /api/usuario-rutina/:id_usuario/:id_rutina`

---

# Como ejecutar

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables en `.env`:
- `PORT`
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

3. Ejecutar:

```bash
npm run dev
```

o

```bash
npm start
```

4. Probar en navegador o Postman:
- `http://localhost:3000/`
- `http://localhost:3000/api/usuarios`
