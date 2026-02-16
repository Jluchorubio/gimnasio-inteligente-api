require('dotenv').config();
const express = require('express');

const usuarioRoutes = require('./routes/usuario.routes');
const entrenadorRoutes = require('./routes/entrenador.routes');
const rutinaRoutes = require('./routes/rutina.routes');
const ejercicioRoutes = require('./routes/ejercicio.routes');
const rutinaEjercicioRoutes = require('./routes/rutinaEjercicio.routes');
const usuarioRutinaRoutes = require('./routes/usuarioRutina.routes');
const progresoRoutes = require('./routes/progreso.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Gimnasio Inteligente activa' });
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
