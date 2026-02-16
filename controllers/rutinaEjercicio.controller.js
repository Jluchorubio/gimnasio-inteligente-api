const RutinaEjercicio = require('../models/rutinaEjercicio.model');

exports.getAllRutinaEjercicios = async (req, res, next) => {
    try {
        const data = await RutinaEjercicio.getAll();
        res.json(data);
    } catch (error) {
        next(error);
    }
};

exports.addEjercicioToRutina = async (req, res, next) => {
    try {
        await RutinaEjercicio.create(req.body);
        res.status(201).json({ message: 'Ejercicio asignado a rutina' });
    } catch (error) {
        next(error);
    }
};

exports.updateRutinaEjercicio = async (req, res, next) => {
    try {
        await RutinaEjercicio.update(
            req.params.id_rutina,
            req.params.id_ejercicio,
            req.body
        );
        res.json({ message: 'Asignacion actualizada' });
    } catch (error) {
        next(error);
    }
};

exports.deleteRutinaEjercicio = async (req, res, next) => {
    try {
        await RutinaEjercicio.delete(req.params.id_rutina, req.params.id_ejercicio);
        res.json({ message: 'Asignacion eliminada' });
    } catch (error) {
        next(error);
    }
};
