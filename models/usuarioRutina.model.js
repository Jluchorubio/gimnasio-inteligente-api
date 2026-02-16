const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM usuario_rutina');
    return rows;
};

exports.create = async (data) => {
    const { id_usuario, id_rutina, fecha_inicio, estado } = data;

    await db.query(
        `INSERT INTO usuario_rutina
         (id_usuario, id_rutina, fecha_inicio, estado)
         VALUES (?, ?, ?, ?)`,
        [id_usuario, id_rutina, fecha_inicio, estado]
    );
};

exports.update = async (id_usuario, id_rutina, data) => {
    const { fecha_inicio, estado } = data;

    await db.query(
        `UPDATE usuario_rutina
         SET fecha_inicio = ?, estado = ?
         WHERE id_usuario = ? AND id_rutina = ?`,
        [fecha_inicio, estado, id_usuario, id_rutina]
    );
};

exports.getRutinasPorUsuario = async (id_usuario) => {
    const [rows] = await db.query(
        `SELECT r.*, ur.fecha_inicio, ur.estado
         FROM usuario_rutina ur
         JOIN rutina r ON ur.id_rutina = r.id_rutina
         WHERE ur.id_usuario = ?`,
        [id_usuario]
    );

    return rows;
};

exports.delete = async (id_usuario, id_rutina) => {
    await db.query(
        `DELETE FROM usuario_rutina
         WHERE id_usuario = ? AND id_rutina = ?`,
        [id_usuario, id_rutina]
    );
};
