/**
 * Rutas relacionadas con la entidad Usuario
 */

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// CRUD básico
router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

// Obtener rutinas asignadas a un usuario (JOIN)
router.get('/:id/rutinas', usuarioController.getRutinasByUsuario);

// Obtener progreso mensual de un usuario
router.get('/:id/progreso-mensual', usuarioController.getProgresoMensual);

module.exports = router;
