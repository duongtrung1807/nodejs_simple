const mysql = require('mysql2');
require('dotenv').config();

console.log('Testing database connection...');
console.log('Database configuration:', {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'dbuser',
    database: process.env.DB_NAME || 'todo_app',
    // Not logging password for security
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'dbuser',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'todo_app'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:');
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Access denied. Please check your username and password.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('Connection refused. Please check if MySQL is running.');
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.error('Database does not exist. Please create the database first.');
        } else {
            console.error('Error code:', err.code);
            console.error('Error message:', err.message);
        }
        process.exit(1);
    }

    console.log('Successfully connected to MySQL database!');
    
    // Test query
    connection.query('SHOW TABLES', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
        } else {
            console.log('Tables in database:');
            console.log(results);
        }
        
        connection.end();
        process.exit(0);
    });
}); 