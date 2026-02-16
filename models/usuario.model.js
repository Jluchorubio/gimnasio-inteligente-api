const db = require('../config/db');

// Obtener todos los usuarios
exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM usuario');
  return rows;
};

// Obtener usuario por ID
exports.getById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM usuario WHERE id_usuario = ?',
    [id]
  );
  return rows[0];
};

// Crear usuario
exports.create = async (data) => {
  const { nombre, email, edad, peso, estatura, fecha_registro } = data;

  const [result] = await db.query(
    `INSERT INTO usuario 
    (nombre, email, edad, peso, estatura, fecha_registro)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, email, edad, peso, estatura, fecha_registro]
  );

  return result.insertId;
};

// Actualizar usuario
exports.update = async (id, data) => {
  const { nombre, email, edad, peso, estatura } = data;

  await db.query(
    `UPDATE usuario
     SET nombre = ?, email = ?, edad = ?, peso = ?, estatura = ?
     WHERE id_usuario = ?`,
    [nombre, email, edad, peso, estatura, id]
  );
};

// Eliminar usuario
exports.delete = async (id) => {
  await db.query(
    'DELETE FROM usuario WHERE id_usuario = ?',
    [id]
  );
};
