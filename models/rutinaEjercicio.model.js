const db = require('../config/db');

exports.getAll = async () => {
    const { rows } = await db.query('SELECT * FROM rutina_ejercicio');
    return rows;
};

exports.create = async (data) => {
    const { id_rutina, id_ejercicio, series, repeticiones, descanso_seg } = data;

    await db.query(
        `INSERT INTO rutina_ejercicio
         (id_rutina, id_ejercicio, series, repeticiones, descanso_seg)
         VALUES ($1, $2, $3, $4, $5)`,
        [id_rutina, id_ejercicio, series, repeticiones, descanso_seg]
    );
};

exports.update = async (id_rutina, id_ejercicio, data) => {
    const { series, repeticiones, descanso_seg } = data;

    await db.query(
        `UPDATE rutina_ejercicio
         SET series = $1, repeticiones = $2, descanso_seg = $3
         WHERE id_rutina = $4 AND id_ejercicio = $5`,
        [series, repeticiones, descanso_seg, id_rutina, id_ejercicio]
    );
};

exports.delete = async (id_rutina, id_ejercicio) => {
    await db.query(
        `DELETE FROM rutina_ejercicio
         WHERE id_rutina = $1 AND id_ejercicio = $2`,
        [id_rutina, id_ejercicio]
    );
};
