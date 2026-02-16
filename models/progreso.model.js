const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM progreso');
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM progreso WHERE id_progreso = ?',
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

    const [result] = await db.query(
        `INSERT INTO progreso
     (id_usuario, peso_actual, porcentaje_grasa, masa_muscular, fecha_registro)
     VALUES (?, ?, ?, ?, ?)`,
        [id_usuario, peso_actual, porcentaje_grasa, masa_muscular, fecha_registro]
    );

    return result.insertId;
};

exports.update = async (id, data) => {
    const { peso_actual, porcentaje_grasa, masa_muscular } = data;

    await db.query(
        `UPDATE progreso
     SET peso_actual = ?, porcentaje_grasa = ?, masa_muscular = ?
     WHERE id_progreso = ?`,
        [peso_actual, porcentaje_grasa, masa_muscular, id]
    );
};

exports.delete = async (id) => {
    await db.query(
        'DELETE FROM progreso WHERE id_progreso = ?',
        [id]
    );
};

// Progreso por usuario ordenado por fecha
exports.getProgresoPorUsuario = async (id_usuario) => {
    const [rows] = await db.query(
        `SELECT *
     FROM progreso
     WHERE id_usuario = ?
     ORDER BY fecha_registro DESC`,
        [id_usuario]
    );

    return rows;
};
