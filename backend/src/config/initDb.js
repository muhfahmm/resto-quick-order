const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const pool = require('./db');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'db_quickorder';

async function initDatabase() {
  console.log('🔄 Checking/Initializing database connection...');
  let connection;
  try {
    // 1. Connect to MySQL without database to ensure DB exists
    connection = await mysql.createConnection({
      host,
      user,
      password,
    });
    
    console.log(`✅ Connected to MySQL server at ${host}`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    console.log(`✅ Database "${database}" ensured.`);
    await connection.end();
    
    // 2. Read and run database.sql if needed
    let sqlPath = path.join(__dirname, '../../database.sql');
    if (!fs.existsSync(sqlPath)) {
      sqlPath = path.join(__dirname, '../../../database.sql');
    }
    
    if (fs.existsSync(sqlPath)) {
      const sqlContent = fs.readFileSync(sqlPath, 'utf8');
      
      const dbConn = await mysql.createConnection({
        host,
        user,
        password,
        database,
        multipleStatements: true
      });
      
      console.log(`🔄 Running database schema migration (${path.basename(sqlPath)})...`);
      await dbConn.query(sqlContent);
      console.log('✅ Schema migration successful.');
      await dbConn.end();
    } else {
      console.warn('⚠️ database.sql not found at', sqlPath);
    }
    
    // 3. Seed initial data if tables are empty
    await seedData();
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('👉 Please make sure XAMPP MySQL is running.');
    throw error;
  }
}

async function seedData() {
  try {
    // Check if admins exist
    const [admins] = await pool.query('SELECT COUNT(*) as count FROM tb_admin');
    if (admins[0].count === 0) {
      console.log('🌱 Seeding default admin...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO tb_admin (username, password) VALUES (?, ?)',
        ['admin', hashedPassword]
      );
      console.log('✅ Default admin "admin" / "admin123" seeded.');
    }
  } catch (error) {
    console.error('⚠️ Seeding warning:', error.message);
  }
}

module.exports = initDatabase;
