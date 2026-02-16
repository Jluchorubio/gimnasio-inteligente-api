const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM entrenador');
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM entrenador WHERE id_entrenador = ?',
        [id]
    );
    return rows[0];
};

exports.create = async (data) => {
    const { nombre, especialidad, email } = data;

    const [result] = await db.query(
        'INSERT INTO entrenador (nombre, especialidad, email) VALUES (?, ?, ?)',
        [nombre, especialidad, email]
    );

    return result.insertId;
};

exports.update = async (id, data) => {
    const { nombre, especialidad, email } = data;

    await db.query(
        `UPDATE entrenador
     SET nombre = ?, especialidad = ?, email = ?
     WHERE id_entrenador = ?`,
        [nombre, especialidad, email, id]
    );
};

exports.delete = async (id) => {
    await db.query(
        'DELETE FROM entrenador WHERE id_entrenador = ?',
        [id]
    );
};
