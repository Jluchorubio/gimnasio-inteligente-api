/**
 * Rutas relacionadas con la entidad Progreso
 */

const express = require('express');
const router = express.Router();
const progresoController = require('../controllers/progreso.controller');

// CRUD básico
router.get('/', progresoController.getAllProgresos);
router.get('/:id', progresoController.getProgresoById);
router.post('/', progresoController.createProgreso);
router.put('/:id', progresoController.updateProgreso);
router.delete('/:id', progresoController.deleteProgreso);

module.exports = router;
