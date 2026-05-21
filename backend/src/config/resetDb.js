const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const initDatabase = require('./initDb');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'db_quickorder';

async function resetDb() {
  console.log('⚠️  Resetting database to schema-only state...');
  try {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      multipleStatements: true
    });

    console.log('🔄 Dropping existing tables...');
    await connection.query(`
      SET FOREIGN_KEY_CHECKS = 0;
      DROP TABLE IF EXISTS tb_orders_items;
      DROP TABLE IF EXISTS tb_orders;
      DROP TABLE IF EXISTS tb_products;
      DROP TABLE IF EXISTS tb_categories;
      DROP TABLE IF EXISTS tb_qrcodes;
      DROP TABLE IF EXISTS tb_admin;
      SET FOREIGN_KEY_CHECKS = 1;
    `);
    console.log('✅ Dropped all tables successfully.');
    await connection.end();

    // Now initialize database from schema
    await initDatabase();
    console.log('✅ Database reset successfully to strict empty schema!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to reset database:', error.message);
    process.exit(1);
  }
}

resetDb();
