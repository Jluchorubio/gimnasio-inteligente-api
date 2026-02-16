/**
 * Rutas para la tabla intermedia Rutina_Ejercicio
 * (Relacion N:M entre Rutina y Ejercicio)
 */

const express = require('express');
const router = express.Router();
const rutinaEjercicioController = require('../controllers/rutinaEjercicio.controller');

router.get('/', rutinaEjercicioController.getAllRutinaEjercicios);
router.post('/', rutinaEjercicioController.addEjercicioToRutina);
router.put('/:id_rutina/:id_ejercicio', rutinaEjercicioController.updateRutinaEjercicio);
router.delete('/:id_rutina/:id_ejercicio', rutinaEjercicioController.deleteRutinaEjercicio);

module.exports = router;
