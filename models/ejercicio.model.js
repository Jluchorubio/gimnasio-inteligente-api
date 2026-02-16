const db = require('../config/db');

/**
 * Obtener todos los ejercicios
 */
exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM ejercicio');
    return rows;
};

/**
 * Obtener ejercicio por ID
 */
exports.getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM ejercicio WHERE id_ejercicio = ?',
        [id]
    );
    return rows[0];
};

/**
 * Crear nuevo ejercicio (ahora incluye imagen_url)
 */
exports.create = async (data) => {
    const { nombre, descripcion, grupo_muscular, tipo, imagen_url = null } = data;

    const [result] = await db.query(
        `INSERT INTO ejercicio 
        (nombre, descripcion, grupo_muscular, tipo, imagen_url)
        VALUES (?, ?, ?, ?, ?)`,
        [nombre, descripcion, grupo_muscular, tipo, imagen_url]
    );

    return result.insertId;
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
         SET nombre = ?, 
             descripcion = ?, 
             grupo_muscular = ?, 
             tipo = ?, 
             imagen_url = COALESCE(?, imagen_url)
         WHERE id_ejercicio = ?`,
        [nombre, descripcion, grupo_muscular, tipo, imagen_url, id]
    );
};

/**
 * Eliminar ejercicio
 */
exports.delete = async (id) => {
    await db.query(
        'DELETE FROM ejercicio WHERE id_ejercicio = ?',
        [id]
    );
};
