const mysql = require('mysql2/promise');

console.log("Establishing MySQL connection pool for db_restaurant_quick_order...");

// Create a connection pool pointing to XAMPP MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',        // Default XAMPP username
  password: process.env.DB_PASSWORD || '',    // Default XAMPP password is empty
  database: process.env.DB_NAME || 'db_restaurant_quick_order',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
