const Usuario = require('../models/usuario.model');
const UsuarioRutina = require('../models/usuarioRutina.model');
const Progreso = require('../models/progreso.model');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};
exports.getAllUsuarios = exports.getUsuarios;

// Obtener usuario por ID
exports.getUsuarioById = async (req, res, next) => {
  try {
    const usuario = await Usuario.getById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

// Crear usuario
exports.createUsuario = async (req, res, next) => {
  try {
    const id = await Usuario.create(req.body);
    res.status(201).json({ message: 'Usuario creado', id });
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
exports.updateUsuario = async (req, res, next) => {
  try {
    await Usuario.update(req.params.id, req.body);
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res, next) => {
  try {
    await Usuario.delete(req.params.id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Obtener rutinas asignadas a un usuario
exports.getRutinasByUsuario = async (req, res, next) => {
  try {
    const data = await UsuarioRutina.getRutinasPorUsuario(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Obtener progreso mensual de un usuario
exports.getProgresoMensual = async (req, res, next) => {
  try {
    const data = await Progreso.getProgresoPorUsuario(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
