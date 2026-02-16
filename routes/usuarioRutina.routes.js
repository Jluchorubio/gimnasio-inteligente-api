/**
 * Rutas para la tabla intermedia Usuario_Rutina
 * (Relacion N:M entre Usuario y Rutina)
 */

const express = require('express');
const router = express.Router();
const usuarioRutinaController = require('../controllers/usuarioRutina.controller');

router.get('/', usuarioRutinaController.getAllUsuarioRutinas);
router.post('/', usuarioRutinaController.assignRutinaToUsuario);
router.put('/:id_usuario/:id_rutina', usuarioRutinaController.updateUsuarioRutina);
router.delete('/:id_usuario/:id_rutina', usuarioRutinaController.deleteUsuarioRutina);

module.exports = router;
