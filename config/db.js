/**
 * Archivo: config/db.js
 * -----------------------------------------
 * Configura y exporta la conexión a MySQL
 * utilizando mysql2 con soporte para Promesas.
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Pool de conexiones.
 * Permite manejar múltiples conexiones de forma eficiente.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Verifica conexión inicial
 */
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado a MySQL correctamente');
    connection.release();
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error.message);
  }
}

testConnection();

module.exports = pool;
