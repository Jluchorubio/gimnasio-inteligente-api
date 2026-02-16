const Progreso = require('../models/progreso.model');

exports.getProgresos = async (req, res, next) => {
    try {
        const data = await Progreso.getAll();
        res.json(data);
    } catch (error) {
        next(error);
    }
};
exports.getAllProgresos = exports.getProgresos;

exports.getProgresoById = async (req, res, next) => {
    try {
        const data = await Progreso.getById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json(data);
    } catch (error) {
        next(error);
    }
};

exports.createProgreso = async (req, res, next) => {
    try {
        const id = await Progreso.create(req.body);
        res.status(201).json({ message: 'Progreso registrado', id });
    } catch (error) {
        next(error);
    }
};

exports.updateProgreso = async (req, res, next) => {
    try {
        await Progreso.update(req.params.id, req.body);
        res.json({ message: 'Progreso actualizado' });
    } catch (error) {
        next(error);
    }
};

exports.deleteProgreso = async (req, res, next) => {
    try {
        await Progreso.delete(req.params.id);
        res.json({ message: 'Progreso eliminado' });
    } catch (error) {
        next(error);
    }
};

// Progreso mensual por usuario
exports.getProgresoPorUsuario = async (req, res, next) => {
    try {
        const data = await Progreso.getProgresoPorUsuario(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
};
