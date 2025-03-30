const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'dbuser',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'todo_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Access denied for user. Please check your database credentials.');
        }
        console.error('Error connecting to the database:', err);
    }
    if (connection) {
        console.log('Successfully connected to the database.');
        connection.release();
    }
});

// Convert pool to use promises
const promisePool = pool.promise();

module.exports = promisePool; 