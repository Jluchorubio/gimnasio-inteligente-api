require('dotenv').config();
const express = require('express');
const path = require('path');

const usuarioRoutes = require('./routes/usuario.routes');
const entrenadorRoutes = require('./routes/entrenador.routes');
const rutinaRoutes = require('./routes/rutina.routes');
const ejercicioRoutes = require('./routes/ejercicio.routes');
const rutinaEjercicioRoutes = require('./routes/rutinaEjercicio.routes');
const usuarioRutinaRoutes = require('./routes/usuarioRutina.routes');
const progresoRoutes = require('./routes/progreso.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS basico para permitir consumo desde frontend (localhost y despliegues externos)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

// Servir frontend estatico
app.use(express.static(path.join(__dirname, 'frontend')));

// Ruta principal: abrir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/entrenadores', entrenadorRoutes);
app.use('/api/rutinas', rutinaRoutes);
app.use('/api/ejercicios', ejercicioRoutes);
app.use('/api/rutina-ejercicio', rutinaEjercicioRoutes);
app.use('/api/usuario-rutina', usuarioRutinaRoutes);
app.use('/api/progresos', progresoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});