const db = require('../config/db');

exports.getAll = async () => {
    const { rows } = await db.query('SELECT * FROM entrenador');
    return rows;
};

exports.getById = async (id) => {
    const { rows } = await db.query(
        'SELECT * FROM entrenador WHERE id_entrenador = $1',
        [id]
    );
    return rows[0];
};

exports.create = async (data) => {
    const { nombre, especialidad, email } = data;

    const { rows } = await db.query(
        'INSERT INTO entrenador (nombre, especialidad, email) VALUES ($1, $2, $3) RETURNING id_entrenador',
        [nombre, especialidad, email]
    );

    return rows[0].id_entrenador;
};

exports.update = async (id, data) => {
    const { nombre, especialidad, email } = data;

    await db.query(
        `UPDATE entrenador
     SET nombre = $1, especialidad = $2, email = $3
     WHERE id_entrenador = $4`,
        [nombre, especialidad, email, id]
    );
};

exports.delete = async (id) => {
    await db.query(
        'DELETE FROM entrenador WHERE id_entrenador = $1',
        [id]
    );
};
