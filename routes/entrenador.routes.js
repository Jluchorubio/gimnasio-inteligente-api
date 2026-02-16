/**
 * Rutas relacionadas con la entidad Entrenador
 */

const express = require('express');
const router = express.Router();
const entrenadorController = require('../controllers/entrenador.controller');

// CRUD básico
router.get('/', entrenadorController.getAllEntrenadores);
router.get('/:id', entrenadorController.getEntrenadorById);
router.post('/', entrenadorController.createEntrenador);
router.put('/:id', entrenadorController.updateEntrenador);
router.delete('/:id', entrenadorController.deleteEntrenador);

// Obtener rutinas de un entrenador
router.get('/:id/rutinas', entrenadorController.getRutinasByEntrenador);

module.exports = router;
