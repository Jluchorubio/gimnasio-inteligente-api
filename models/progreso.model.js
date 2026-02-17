const db = require('../config/db');

exports.getAll = async () => {
    const { rows } = await db.query('SELECT * FROM progreso');
    return rows;
};

exports.getById = async (id) => {
    const { rows } = await db.query(
        'SELECT * FROM progreso WHERE id_progreso = $1',
        [id]
    );
    return rows[0];
};

exports.create = async (data) => {
    const {
        id_usuario,
        peso_actual,
        porcentaje_grasa,
        masa_muscular,
        fecha_registro
    } = data;

    const { rows } = await db.query(
        `INSERT INTO progreso
     (id_usuario, peso_actual, porcentaje_grasa, masa_muscular, fecha_registro)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_progreso`,
        [id_usuario, peso_actual, porcentaje_grasa, masa_muscular, fecha_registro]
    );

    return rows[0].id_progreso;
};

exports.update = async (id, data) => {
    const { peso_actual, porcentaje_grasa, masa_muscular } = data;

    await db.query(
        `UPDATE progreso
     SET peso_actual = $1, porcentaje_grasa = $2, masa_muscular = $3
     WHERE id_progreso = $4`,
        [peso_actual, porcentaje_grasa, masa_muscular, id]
    );
};

exports.delete = async (id) => {
    await db.query(
        'DELETE FROM progreso WHERE id_progreso = $1',
        [id]
    );
};

// Progreso por usuario ordenado por fecha
exports.getProgresoPorUsuario = async (id_usuario) => {
    const { rows } = await db.query(
        `SELECT *
     FROM progreso
     WHERE id_usuario = $1
     ORDER BY fecha_registro DESC`,
        [id_usuario]
    );

    return rows;
};
