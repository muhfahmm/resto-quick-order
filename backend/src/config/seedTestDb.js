const mysql = require('mysql2/promise');
const pool = require('./db');

async function seedTestData() {
  console.log('🌱 Starting manual test seeding...');
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Seed Meja 11
    console.log('🌱 Seeding Meja 11...');
    await connection.query(
      'INSERT INTO tables (table_number, status) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = ?',
      [11, 'available', 'available']
    );
    console.log('✅ Meja 11 seeded.');

    // 2. Seed Categories (Makanan, Minuman, Snack)
    console.log('🌱 Seeding categories...');
    const categories = [
      [1, 'Makanan', 'Menu hidangan utama utama'],
      [2, 'Minuman', 'Minuman segar dingin dan hangat'],
      [3, 'Snack', 'Cemilan pendamping santai']
    ];

    for (const cat of categories) {
      await connection.query(
        'INSERT INTO categories (id, name, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE description = ?',
        [cat[0], cat[1], cat[2], cat[2]]
      );
    }
    console.log('✅ Categories seeded.');

    // 3. Seed Menu Items (12 Items)
    console.log('🌱 Seeding menu items...');
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
      [12, 3, 'Onion Rings', 'Bawang goreng tepung crispy', 18000, '/images/onion-rings.jpg', true]
    ];

    for (const item of items) {
      await connection.query(
        `INSERT INTO menu_items (id, category_id, name, description, price, image_url, is_available) 
         VALUES (?, ?, ?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE 
           category_id = VALUES(category_id),
           name = VALUES(name),
           description = VALUES(description),
           price = VALUES(price),
           image_url = VALUES(image_url),
           is_available = VALUES(is_available)`,
        item
      );
    }
    console.log('✅ Menu items seeded.');

    await connection.commit();
    console.log('🎉 Manual test seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    await connection.rollback();
    console.error('❌ Failed manual test seeding:', error.message);
    process.exit(1);
  } finally {
    connection.release();
  }
}

seedTestData();
