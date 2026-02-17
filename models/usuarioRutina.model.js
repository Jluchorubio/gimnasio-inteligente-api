const db = require('../config/db');

exports.getAll = async () => {
    const { rows } = await db.query('SELECT * FROM usuario_rutina');
    return rows;
};

exports.create = async (data) => {
    const { id_usuario, id_rutina, fecha_inicio, estado } = data;

    await db.query(
        `INSERT INTO usuario_rutina
         (id_usuario, id_rutina, fecha_inicio, estado)
         VALUES ($1, $2, $3, $4)`,
        [id_usuario, id_rutina, fecha_inicio, estado]
    );
};

exports.update = async (id_usuario, id_rutina, data) => {
    const { fecha_inicio, estado } = data;

    await db.query(
        `UPDATE usuario_rutina
         SET fecha_inicio = $1, estado = $2
         WHERE id_usuario = $3 AND id_rutina = $4`,
        [fecha_inicio, estado, id_usuario, id_rutina]
    );
};

exports.getRutinasPorUsuario = async (id_usuario) => {
    const { rows } = await db.query(
        `SELECT r.*, ur.fecha_inicio, ur.estado
         FROM usuario_rutina ur
         JOIN rutina r ON ur.id_rutina = r.id_rutina
         WHERE ur.id_usuario = $1`,
        [id_usuario]
    );

    return rows;
};

exports.delete = async (id_usuario, id_rutina) => {
    await db.query(
        `DELETE FROM usuario_rutina
         WHERE id_usuario = $1 AND id_rutina = $2`,
        [id_usuario, id_rutina]
    );
};
