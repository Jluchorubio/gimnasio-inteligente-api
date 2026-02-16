const UsuarioRutina = require('../models/usuarioRutina.model');

exports.getAllUsuarioRutinas = async (req, res, next) => {
    try {
        const data = await UsuarioRutina.getAll();
        res.json(data);
    } catch (error) {
        next(error);
    }
};

exports.assignRutinaToUsuario = async (req, res, next) => {
    try {
        await UsuarioRutina.create(req.body);
        res.status(201).json({ message: 'Rutina asignada al usuario' });
    } catch (error) {
        next(error);
    }
};

exports.updateUsuarioRutina = async (req, res, next) => {
    try {
        await UsuarioRutina.update(
            req.params.id_usuario,
            req.params.id_rutina,
            req.body
        );
        res.json({ message: 'Asignacion actualizada' });
    } catch (error) {
        next(error);
    }
};

exports.deleteUsuarioRutina = async (req, res, next) => {
    try {
        await UsuarioRutina.delete(req.params.id_usuario, req.params.id_rutina);
        res.json({ message: 'Asignacion eliminada' });
    } catch (error) {
        next(error);
    }
};
