const mysql = require('mysql2');
require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
// Crea la conexión a la base de datos
const connection = mysql.createPool({
  host: DB_HOST,  // Reemplaza con tu host
  user: DB_USER, // Reemplaza con tu usuario
  password: DB_PASSWORD, // Reemplaza con tu contraseña
  database: DB_NAME, // Reemplaza con el nombre de tu base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Conecta a la base de datos
// connection.connect(error => {
//   if (error) {
//     console.error('Error conectando a la base de datos: ' + error.stack);
//     return;
//   }

//   console.log('Conectado a la base de datos con el id ' + connection.threadId);
// });

module.exports = connection;
