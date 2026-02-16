const Rutina = require('../models/rutina.model');

exports.getRutinas = async (req, res, next) => {
  try {
    const data = await Rutina.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
exports.getAllRutinas = exports.getRutinas;

exports.getRutinaById = async (req, res, next) => {
  try {
    const data = await Rutina.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Rutina no encontrada' });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.createRutina = async (req, res, next) => {
  try {
    const id = await Rutina.create(req.body);
    res.status(201).json({ message: 'Rutina creada', id });
  } catch (error) {
    next(error);
  }
};

exports.updateRutina = async (req, res, next) => {
  try {
    await Rutina.update(req.params.id, req.body);
    res.json({ message: 'Rutina actualizada' });
  } catch (error) {
    next(error);
  }
};

exports.deleteRutina = async (req, res, next) => {
  try {
    await Rutina.delete(req.params.id);
    res.json({ message: 'Rutina eliminada' });
  } catch (error) {
    next(error);
  }
};

// JOIN: Rutinas con entrenador
exports.getRutinasConEntrenador = async (req, res, next) => {
  try {
    const data = await Rutina.getRutinasConEntrenador();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// JOIN: Ejercicios de una rutina
exports.getEjerciciosDeRutina = async (req, res, next) => {
  try {
    const data = await Rutina.getEjerciciosDeRutina(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
exports.getEjerciciosByRutina = exports.getEjerciciosDeRutina;
