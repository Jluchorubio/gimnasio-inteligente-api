const db = require('../config/db');

exports.getAll = async () => {
  const { rows } = await db.query('SELECT * FROM rutina');
  return rows;
};

exports.getById = async (id) => {
  const { rows } = await db.query(
    'SELECT * FROM rutina WHERE id_rutina = $1',
    [id]
  );
  return rows[0];
};

exports.create = async (data) => {
  const { nombre, descripcion, nivel, id_entrenador } = data;

  const { rows } = await db.query(
    `INSERT INTO rutina (nombre, descripcion, nivel, id_entrenador)
     VALUES ($1, $2, $3, $4)
     RETURNING id_rutina`,
    [nombre, descripcion, nivel, id_entrenador]
  );

  return rows[0].id_rutina;
};

exports.update = async (id, data) => {
  const { nombre, descripcion, nivel, id_entrenador } = data;

  await db.query(
    `UPDATE rutina
     SET nombre = $1, descripcion = $2, nivel = $3, id_entrenador = $4
     WHERE id_rutina = $5`,
    [nombre, descripcion, nivel, id_entrenador, id]
  );
};

exports.delete = async (id) => {
  await db.query(
    'DELETE FROM rutina WHERE id_rutina = $1',
    [id]
  );
};

// JOIN: Rutinas con entrenador
exports.getRutinasConEntrenador = async () => {
  const { rows } = await db.query(`
    SELECT r.*, e.nombre AS entrenador
    FROM rutina r
    JOIN entrenador e ON r.id_entrenador = e.id_entrenador
  `);
  return rows;
};

// JOIN: Ejercicios de una rutina
exports.getEjerciciosDeRutina = async (id) => {
  const { rows } = await db.query(`
    SELECT ej.id_ejercicio, ej.nombre, re.series, re.repeticiones, re.descanso_seg
    FROM rutina_ejercicio re
    JOIN ejercicio ej ON re.id_ejercicio = ej.id_ejercicio
    WHERE re.id_rutina = $1
  `, [id]);

  return rows;
};

exports.getByEntrenador = async (id_entrenador) => {
  const { rows } = await db.query(
    'SELECT * FROM rutina WHERE id_entrenador = $1',
    [id_entrenador]
  );

  return rows;
};
