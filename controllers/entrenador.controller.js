const Entrenador = require('../models/entrenador.model');
const Rutina = require('../models/rutina.model');

exports.getEntrenadores = async (req, res, next) => {
    try {
        const data = await Entrenador.getAll();
        res.json(data);
    } catch (error) {
        next(error);
    }
};
exports.getAllEntrenadores = exports.getEntrenadores;

exports.getEntrenadorById = async (req, res, next) => {
    try {
        const data = await Entrenador.getById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Entrenador no encontrado' });
        res.json(data);
    } catch (error) {
        next(error);
    }
};

exports.createEntrenador = async (req, res, next) => {
    try {
        const id = await Entrenador.create(req.body);
        res.status(201).json({ message: 'Entrenador creado', id });
    } catch (error) {
        next(error);
    }
};

exports.updateEntrenador = async (req, res, next) => {
    try {
        await Entrenador.update(req.params.id, req.body);
        res.json({ message: 'Entrenador actualizado' });
    } catch (error) {
        next(error);
    }
};

exports.deleteEntrenador = async (req, res, next) => {
    try {
        await Entrenador.delete(req.params.id);
        res.json({ message: 'Entrenador eliminado' });
    } catch (error) {
        next(error);
    }
};

exports.getRutinasByEntrenador = async (req, res, next) => {
    try {
        const data = await Rutina.getByEntrenador(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};
