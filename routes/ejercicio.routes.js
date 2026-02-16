/**
 * Rutas relacionadas con la entidad Ejercicio
 */

const express = require('express');
const router = express.Router();
const ejercicioController = require('../controllers/ejercicio.controller');

// CRUD básico
router.get('/', ejercicioController.getAllEjercicios);
router.get('/:id', ejercicioController.getEjercicioById);
router.post('/', ejercicioController.createEjercicio);
router.put('/:id', ejercicioController.updateEjercicio);
router.delete('/:id', ejercicioController.deleteEjercicio);

module.exports = router;
