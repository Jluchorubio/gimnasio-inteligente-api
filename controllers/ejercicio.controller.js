const Ejercicio = require('../models/ejercicio.model');

/**
 * Obtener todos los ejercicios
 */
exports.getEjercicios = async (req, res, next) => {
    try {
        const data = await Ejercicio.getAll();
        res.json(data);
    } catch (error) {
        next(error);
    }
};
exports.getAllEjercicios = exports.getEjercicios;

/**
 * Obtener ejercicio por ID
 */
exports.getEjercicioById = async (req, res, next) => {
    try {
        const data = await Ejercicio.getById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: 'Ejercicio no encontrado' });
        }

        res.json(data);
    } catch (error) {
        next(error);
    }
};

/**
 * Crear ejercicio (ahora incluye imagen_url)
 */
exports.createEjercicio = async (req, res, next) => {
    try {
        const { nombre, descripcion, grupo_muscular, tipo, imagen_url } = req.body;

        const id = await Ejercicio.create({
            nombre,
            descripcion,
            grupo_muscular,
            tipo,
            imagen_url
        });

        res.status(201).json({
            message: 'Ejercicio creado correctamente',
            id
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Actualizar ejercicio
 */
exports.updateEjercicio = async (req, res, next) => {
    try {
        const { nombre, descripcion, grupo_muscular, tipo, imagen_url } = req.body;

        await Ejercicio.update(req.params.id, {
            nombre,
            descripcion,
            grupo_muscular,
            tipo,
            imagen_url
        });

        res.json({ message: 'Ejercicio actualizado correctamente' });
    } catch (error) {
        next(error);
    }
};

/**
 * Eliminar ejercicio
 */
exports.deleteEjercicio = async (req, res, next) => {
    try {
        await Ejercicio.delete(req.params.id);
        res.json({ message: 'Ejercicio eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};
