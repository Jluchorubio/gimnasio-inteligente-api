const db = require('../config/db');

// Obtener todos los usuarios
exports.getAll = async () => {
  const { rows } = await db.query('SELECT * FROM usuario');
  return rows;
};

// Obtener usuario por ID
exports.getById = async (id) => {
  const { rows } = await db.query(
    'SELECT * FROM usuario WHERE id_usuario = $1',
    [id]
  );
  return rows[0];
};

// Crear usuario
exports.create = async (data) => {
  const { nombre, email, edad, peso, estatura, fecha_registro } = data;

  const { rows } = await db.query(
    `INSERT INTO usuario
    (nombre, email, edad, peso, estatura, fecha_registro)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id_usuario`,
    [nombre, email, edad, peso, estatura, fecha_registro]
  );

  return rows[0].id_usuario;
};

// Actualizar usuario
exports.update = async (id, data) => {
  const { nombre, email, edad, peso, estatura } = data;

  await db.query(
    `UPDATE usuario
     SET nombre = $1, email = $2, edad = $3, peso = $4, estatura = $5
     WHERE id_usuario = $6`,
    [nombre, email, edad, peso, estatura, id]
  );
};

// Eliminar usuario
exports.delete = async (id) => {
  await db.query(
    'DELETE FROM usuario WHERE id_usuario = $1',
    [id]
  );
};
