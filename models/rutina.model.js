const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM rutina');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM rutina WHERE id_rutina = ?',
    [id]
  );
  return rows[0];
};

exports.create = async (data) => {
  const { nombre, descripcion, nivel, id_entrenador } = data;

  const [result] = await db.query(
    `INSERT INTO rutina (nombre, descripcion, nivel, id_entrenador)
     VALUES (?, ?, ?, ?)`,
    [nombre, descripcion, nivel, id_entrenador]
  );

  return result.insertId;
};

exports.update = async (id, data) => {
  const { nombre, descripcion, nivel, id_entrenador } = data;

  await db.query(
    `UPDATE rutina
     SET nombre = ?, descripcion = ?, nivel = ?, id_entrenador = ?
     WHERE id_rutina = ?`,
    [nombre, descripcion, nivel, id_entrenador, id]
  );
};

exports.delete = async (id) => {
  await db.query(
    'DELETE FROM rutina WHERE id_rutina = ?',
    [id]
  );
};

// JOIN: Rutinas con entrenador
exports.getRutinasConEntrenador = async () => {
  const [rows] = await db.query(`
    SELECT r.*, e.nombre AS entrenador
    FROM rutina r
    JOIN entrenador e ON r.id_entrenador = e.id_entrenador
  `);
  return rows;
};

// JOIN: Ejercicios de una rutina
exports.getEjerciciosDeRutina = async (id) => {
  const [rows] = await db.query(`
    SELECT ej.id_ejercicio, ej.nombre, re.series, re.repeticiones, re.descanso_seg
    FROM rutina_ejercicio re
    JOIN ejercicio ej ON re.id_ejercicio = ej.id_ejercicio
    WHERE re.id_rutina = ?
  `, [id]);

  return rows;
};

exports.getByEntrenador = async (id_entrenador) => {
  const [rows] = await db.query(
    'SELECT * FROM rutina WHERE id_entrenador = ?',
    [id_entrenador]
  );

  return rows;
};
