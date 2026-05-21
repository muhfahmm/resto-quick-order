const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const initDatabase = require('./config/initDb');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger Middleware to distinguish between USER and ADMIN access
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString('id-ID');
  let role = '🌐 SYSTEM';
  let color = '\x1b[37m'; // White
  
  const path = req.path;
  const method = req.method;

  // Admin endpoints: Auth, GET all orders, PATCH order status
  const isAdmin = path.startsWith('/api/auth') || 
                  (path === '/api/orders' && method === 'GET') ||
                  (path.match(/^\/api\/orders\/[^\/]+\/status$/) && method === 'PATCH');

  // User endpoints: categories list, menu list, POST order, table verification
  const isUser = path === '/api/categories' || 
                 path === '/api/menu' || 
                 (path === '/api/orders' && method === 'POST') ||
                 path.startsWith('/api/tables/');

  if (isAdmin) {
    role = '🔑 ADMIN ';
    color = '\x1b[36m'; // Cyan
  } else if (isUser) {
    role = '🛒 USER  ';
    color = '\x1b[32m'; // Green
  }

  console.log(`[${time}] [${color}${role}\x1b[0m] ${method} ${req.originalUrl}`);
  next();
});

// ==============================
// API ROUTES
// ==============================

// --- USER (CUSTOMER) ENDPOINTS ---

// GET verifikasi meja
app.get('/api/tables/:table_number', async (req, res) => {
  const { table_number } = req.params;
  try {
    const [tables] = await pool.query('SELECT * FROM tables WHERE table_number = ?', [parseInt(table_number)]);
    if (tables.length === 0) {
      return res.status(404).json({ success: false, message: `Meja ${table_number} tidak terdaftar di database` });
    }
    res.json({ success: true, data: tables[0] });
  } catch (error) {
    console.error('Error fetching table:', error);
    res.status(500).json({ success: false, message: 'Gagal memvalidasi meja dari database' });
  }
});

// GET semua kategori
app.get('/api/categories', async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories');
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data kategori dari database' });
  }
});

// GET semua menu (bisa filter by category_id)
app.get('/api/menu', async (req, res) => {
  const { category_id } = req.query;
  try {
    let sql = 'SELECT * FROM menu_items WHERE is_available = true';
    const params = [];
    if (category_id && category_id !== '0') {
      sql += ' AND category_id = ?';
      params.push(parseInt(category_id));
    }
    const [items] = await pool.query(sql, params);
    
    // Format DECIMAL prices as standard numbers
    const formattedItems = items.map(item => ({
      ...item,
      price: parseFloat(item.price),
      is_available: !!item.is_available
    }));
    
    res.json({ success: true, data: formattedItems });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data menu dari database' });
  }
});

// POST pesanan baru dari meja
app.post('/api/orders', async (req, res) => {
  const { table_number, items, total_amount } = req.body;

  if (!table_number || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Data pesanan tidak lengkap atau tidak valid' });
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Insert into orders table
    const [orderResult] = await conn.query(
      'INSERT INTO orders (table_number, total_amount, status, payment_status) VALUES (?, ?, ?, ?)',
      [table_number, total_amount, 'pending', 'unpaid']
    );
    const orderId = orderResult.insertId;

    // 2. Insert into order_items table
    for (const item of items) {
      // Get current price of menu item from database to ensure price integrity
      const [menuItem] = await conn.query('SELECT price FROM menu_items WHERE id = ?', [item.menu_item_id]);
      if (menuItem.length === 0) {
        throw new Error(`Menu item dengan ID ${item.menu_item_id} tidak ditemukan`);
      }
      const price = parseFloat(menuItem[0].price);

      await conn.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.menu_item_id, item.quantity, price]
      );
    }

    await conn.commit();
    conn.release();

    console.log(`\x1b[32m[USER ACTION]\x1b[0m 🔔 Pesanan baru disimpan ke database: Meja ${table_number}!`);
    console.log(`   ID Pesanan: ${orderId}`);
    console.log(`   Total: Rp ${total_amount?.toLocaleString('id-ID')}`);
    console.log(`   Items: ${items?.length} item(s)`);

    res.json({
      success: true,
      message: 'Pesanan berhasil dikirim!',
      data: {
        id: orderId.toString(),
        table_number,
        total_amount,
        status: 'pending',
        order_time: new Date().toISOString()
      }
    });

  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error('Error saving order to database:', error);
    res.status(500).json({ success: false, message: error.message || 'Gagal menyimpan pesanan ke database' });
  }
});

// --- ADMIN (KASIR) ENDPOINTS ---

// POST register kasir/admin baru
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Semua kolom wajib diisi!' });
  }
  
  try {
    // Check if username already exists
    const [existing] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Username sudah terdaftar!' });
    }
    
    // Hash password and insert
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.query(
      'INSERT INTO admins (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 🔑 Registrasi admin baru berhasil: "${username}"`);
    
    res.json({
      success: true,
      message: 'Registrasi berhasil! Silakan login.',
      user: { username }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Gagal memproses registrasi admin baru' });
  }
});

// POST login kasir/admin
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [admins] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (admins.length > 0) {
      const admin = admins[0];
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 🔑 Login berhasil untuk admin: "${username}"`);
        res.json({
          success: true,
          message: 'Login berhasil!',
          token: 'dummy-jwt-token-quickorder',
          user: { username: admin.username }
        });
        return;
      }
    }
    
    console.log(`\x1b[31m[ADMIN ACTION]\x1b[0m ❌ Percobaan login gagal untuk admin: "${username}"`);
    res.status(401).json({
      success: false,
      message: 'Username atau password salah!'
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Gagal memproses login admin' });
  }
});

// GET semua pesanan (dashboard kasir)
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY order_time DESC');
    if (orders.length === 0) {
      console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 📋 Dashboard kasir menarik semua data pesanan (0 pesanan total).`);
      return res.json({ success: true, data: [] });
    }

    const orderIds = orders.map(o => o.id);
    const [orderItems] = await pool.query(
      `SELECT oi.*, mi.name as name 
       FROM order_items oi 
       JOIN menu_items mi ON oi.menu_item_id = mi.id 
       WHERE oi.order_id IN (${orderIds.map(() => '?').join(',')})`,
      orderIds
    );

    const itemsByOrderId = {};
    orderItems.forEach(item => {
      if (!itemsByOrderId[item.order_id]) {
        itemsByOrderId[item.order_id] = [];
      }
      itemsByOrderId[item.order_id].push({
        id: item.id,
        menu_item_id: item.menu_item_id,
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price)
      });
    });

    const formattedOrders = orders.map(order => ({
      id: order.id.toString(),
      table_number: order.table_number,
      total_amount: parseFloat(order.total_amount),
      status: order.status,
      order_time: order.order_time,
      items: itemsByOrderId[order.id] || []
    }));

    console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 📋 Dashboard kasir menarik semua data pesanan (${formattedOrders.length} pesanan total).`);
    res.json({ success: true, data: formattedOrders });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data pesanan dari database' });
  }
});

// PATCH update status pesanan (diproses, selesai, dibatalkan)
app.patch('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
    if (orders.length === 0) {
      console.log(`\x1b[31m[ADMIN ACTION]\x1b[0m ❌ Gagal memperbarui status: Pesanan ID ${id} tidak ditemukan.`);
      return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
    }

    const order = orders[0];
    const oldStatus = order.status;

    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m ✏️ Pesanan ID ${id} diperbarui: [${oldStatus}] ➔ [\x1b[33m${status}\x1b[0m]`);

    res.json({
      success: true,
      message: `Status pesanan berhasil diubah menjadi ${status}`,
      data: {
        id: id.toString(),
        table_number: order.table_number,
        total_amount: parseFloat(order.total_amount),
        status: status,
        order_time: order.order_time
      }
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui status pesanan' });
  }
});

// Root endpoint to prevent 'Cannot GET /'
app.get('/', (req, res) => {
  res.json({
    status: 'active',
    message: 'Welcome to QuickOrder Restaurant API Server',
    version: '1.0.0',
    endpoints: {
      user: [
        'GET /api/categories',
        'GET /api/menu',
        'POST /api/orders'
      ],
      admin: [
        'POST /api/auth/login',
        'GET /api/orders',
        'PATCH /api/orders/:id/status'
      ]
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'QuickOrder API is running' });
});

// ==============================
// START SERVER AFTER DB INIT
// ==============================
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n🚀 QuickOrder Backend API running on http://localhost:${PORT}`);
      console.log(`📋 ENDPOINTS USER (Pelanggan):`);
      console.log(`   GET  /api/categories  - Ambil kategori`);
      console.log(`   GET  /api/menu        - Ambil list menu`);
      console.log(`   POST /api/orders      - Buat pesanan baru`);
      console.log(`📋 ENDPOINTS ADMIN (Kasir):`);
      console.log(`   POST /api/auth/login  - Login admin`);
      console.log(`   GET  /api/orders      - Lihat semua pesanan`);
      console.log(`   PATCH/api/orders/:id/status - Ubah status pesanan\n`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to initialize database. Server cannot start:', err.message);
    process.exit(1);
  });
