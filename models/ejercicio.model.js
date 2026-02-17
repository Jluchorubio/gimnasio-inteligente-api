const db = require('../config/db');

/**
 * Obtener todos los ejercicios
 */
exports.getAll = async () => {
    const { rows } = await db.query('SELECT * FROM ejercicio');
    return rows;
};

/**
 * Obtener ejercicio por ID
 */
exports.getById = async (id) => {
    const { rows } = await db.query(
        'SELECT * FROM ejercicio WHERE id_ejercicio = $1',
        [id]
    );
    return rows[0];
};

/**
 * Crear nuevo ejercicio (ahora incluye imagen_url)
 */
exports.create = async (data) => {
    const { nombre, descripcion, grupo_muscular, tipo, imagen_url = null } = data;

    const { rows } = await db.query(
        `INSERT INTO ejercicio
        (nombre, descripcion, grupo_muscular, tipo, imagen_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id_ejercicio`,
        [nombre, descripcion, grupo_muscular, tipo, imagen_url]
    );

    return rows[0].id_ejercicio;
};

/**
 * Actualizar ejercicio (ahora incluye imagen_url)
 */
exports.update = async (id, data) => {
    const {
        nombre,
        descripcion,
        grupo_muscular,
        tipo,
        imagen_url = null
    } = data;

    await db.query(
        `UPDATE ejercicio
         SET nombre = $1,
             descripcion = $2,
             grupo_muscular = $3,
             tipo = $4,
             imagen_url = COALESCE($5, imagen_url)
         WHERE id_ejercicio = $6`,
        [nombre, descripcion, grupo_muscular, tipo, imagen_url, id]
    );
};

/**
 * Eliminar ejercicio
 */
exports.delete = async (id) => {
    await db.query(
        'DELETE FROM ejercicio WHERE id_ejercicio = $1',
        [id]
    );
};
