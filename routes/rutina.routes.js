/**
 * Rutas relacionadas con la entidad Rutina
 */

const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutina.controller');

// Ruta estÃ¡tica primero para evitar conflicto con '/:id'
router.get('/detalle/con-entrenador', rutinaController.getRutinasConEntrenador);

// CRUD bÃ¡sico
router.get('/', rutinaController.getAllRutinas);
router.get('/:id', rutinaController.getRutinaById);
router.post('/', rutinaController.createRutina);
router.put('/:id', rutinaController.updateRutina);
router.delete('/:id', rutinaController.deleteRutina);

// Obtener ejercicios de una rutina
router.get('/:id/ejercicios', rutinaController.getEjerciciosByRutina);

module.exports = router;
