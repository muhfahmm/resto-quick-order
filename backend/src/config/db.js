const mysql = require('mysql2/promise');

console.log("Establishing MySQL connection pool for db_restaurant_quick_order...");

// Automatically detect if running locally (Windows) or on cPanel hosting (Linux)
const isLocal = process.platform === 'win32';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost', // local loopback is standard for both XAMPP and cPanel
  user: process.env.DB_USER || (isLocal ? 'root' : 'grap5916_admin_resto'),
  password: process.env.DB_PASSWORD || (isLocal ? '' : 'hiimCpanel_110407'),
  database: process.env.DB_NAME || (isLocal ? 'db_restaurant_quick_order' : 'grap5916_db_restaurant_quick_order'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log(`ℹ️ Auto-detected Environment: Using ${isLocal ? 'Local XAMPP' : 'cPanel Production'} database configurations.`);

const pool = mysql.createPool(dbConfig);

module.exports = pool;
