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
    const sqlPath = path.join(__dirname, '../../database.sql');
    if (fs.existsSync(sqlPath)) {
      const sqlContent = fs.readFileSync(sqlPath, 'utf8');
      
      const dbConn = await mysql.createConnection({
        host,
        user,
        password,
        database,
        multipleStatements: true
      });
      
      console.log('🔄 Running database schema migration (database.sql)...');
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
    const [admins] = await pool.query('SELECT COUNT(*) as count FROM admins');
    if (admins[0].count === 0) {
      console.log('🌱 Seeding default admin...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO admins (username, password, name, role) VALUES (?, ?, ?, ?)',
        ['admin', hashedPassword, 'Kasir Utama', 'admin']
      );
      console.log('✅ Default admin "admin" / "admin123" seeded.');
    }
    
    // Check if categories exist
    const [categories] = await pool.query('SELECT COUNT(*) as count FROM categories');
    if (categories[0].count === 0) {
      console.log('🌱 Seeding default categories...');
      await pool.query('INSERT INTO categories (id, name, description) VALUES (1, "Makanan", "Menu hidangan utama utama"), (2, "Minuman", "Minuman segar dingin dan hangat"), (3, "Snack", "Cemilan pendamping santai")');
      console.log('✅ Default categories seeded.');
    }
    
    // Check if menu_items exist
    const [menuItems] = await pool.query('SELECT COUNT(*) as count FROM menu_items');
    if (menuItems[0].count === 0) {
      console.log('🌱 Seeding default menu items...');
      const items = [
        [1, 1, 'Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam, dan sayuran segar', 35000, '/images/nasi-goreng.jpg', true],
        [2, 1, 'Mie Goreng Seafood', 'Mie goreng dengan udang, cumi, dan bumbu spesial', 38000, '/images/mie-goreng.jpg', true],
        [3, 1, 'Ayam Bakar Madu', 'Ayam bakar dengan saus madu pilihan chef', 45000, '/images/ayam-bakar.jpg', true],
        [4, 1, 'Sate Ayam', '10 tusuk sate ayam dengan bumbu kacang', 30000, '/images/sate-ayam.jpg', true],
        [5, 1, 'Steak Sapi', 'Steak sapi premium dengan saus black pepper', 75000, '/images/steak.jpg', true],
        [6, 2, 'Es Teh Manis', 'Teh manis segar dengan es batu', 8000, '/images/es-teh.jpg', true],
        [7, 2, 'Jus Jeruk', 'Jus jeruk segar tanpa pengawet', 15000, '/images/jus-jeruk.jpg', true],
        [8, 2, 'Kopi Susu', 'Kopi susu gula aren khas resto', 22000, '/images/kopi-susu.jpg', true],
        [9, 2, 'Milkshake Coklat', 'Milkshake coklat premium dengan whipped cream', 28000, '/images/milkshake.jpg', true],
        [10, 3, 'Kentang Goreng', 'Kentang goreng crispy dengan saus sambal mayo', 20000, '/images/kentang.jpg', true],
        [11, 3, 'Chicken Wings', '6 pcs sayap ayam goreng bumbu BBQ', 32000, '/images/wings.jpg', true],
        [12, 3, 'Onion Rings', 'Bawang goreng tepung crispy', 18000, '/images/onion-rings.jpg', true],
      ];
      
      for (const item of items) {
        await pool.query(
          'INSERT INTO menu_items (id, category_id, name, description, price, image_url, is_available) VALUES (?, ?, ?, ?, ?, ?, ?)',
          item
        );
      }
      console.log('✅ Default menu items seeded.');
    }
    
    // Check if tables exist
    const [tablesCount] = await pool.query('SELECT COUNT(*) as count FROM tables');
    if (tablesCount[0].count === 0) {
      console.log('🌱 Seeding default tables (1 - 20)...');
      for (let i = 1; i <= 20; i++) {
        await pool.query('INSERT INTO tables (table_number, status) VALUES (?, ?)', [i, 'available']);
      }
      console.log('✅ Default tables seeded.');
    }
  } catch (error) {
    console.error('⚠️ Seeding warning:', error.message);
  }
}

module.exports = initDatabase;
