require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const initDatabase = require('./config/initDb');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeName = file.originalname.replace(/[^a-z0-9.\-\_]/gi, '_');
    cb(null, `${unique}-${safeName}`);
  }
});
const upload = multer({ storage });

// Handle malformed JSON body errors from body-parser
app.use((err, req, res, next) => {
  // body-parser JSON errors may appear as SyntaxError or have type 'entity.parse.failed'
  if (err && (err.type === 'entity.parse.failed' || err instanceof SyntaxError)) {
    console.error('Malformed JSON in request body:', err && err.message);
    return res.status(400).json({ success: false, message: 'Malformed JSON body' });
  }
  next(err);
});

// Request Logger Middleware to distinguish between USER and ADMIN access
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString('id-ID');
  let role = '🌐 SYSTEM';
  let color = '\x1b[37m'; // White
  
  const path = req.path;
  const method = req.method;

  // Admin endpoints: Auth, GET all orders, PATCH order status, QR Codes admin
  const isAdmin = path.startsWith('/api/auth') || 
                  (path === '/api/orders' && method === 'GET') ||
                  (path.match(/^\/api\/orders\/[^\/]+\/status$/) && method === 'PATCH') ||
                  path.startsWith('/api/qrcodes');

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
    const [tables] = await pool.query('SELECT * FROM tb_qrcodes WHERE table_number = ?', [parseInt(table_number)]);
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
    const [categories] = await pool.query('SELECT * FROM tb_categories');
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
    let sql = 'SELECT * FROM tb_products WHERE is_available = true';
    const params = [];
    if (category_id && category_id !== '0' && category_id !== 0) {
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
  const { table_number, items, total_amount, customer_name, payment_method } = req.body;
  const payMethod = ['cash', 'qris', 'debit', 'ewallet'].includes(payment_method) ? payment_method : 'cash';

  if (!table_number || !customer_name || !customer_name.trim() || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Nama pemesan dan data pesanan wajib diisi!' });
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Insert into tb_orders table
    let orderResult;
    try {
      [orderResult] = await conn.query(
        'INSERT INTO tb_orders (table_number, customer_name, total_amount, status, payment_status, payment_method) VALUES (?, ?, ?, ?, ?, ?)',
        [table_number, customer_name.trim(), total_amount, 'pending', 'unpaid', payMethod]
      );
    } catch (insertErr) {
      if (insertErr.code === 'ER_BAD_FIELD_ERROR') {
        [orderResult] = await conn.query(
          'INSERT INTO tb_orders (table_number, customer_name, total_amount, status, payment_status) VALUES (?, ?, ?, ?, ?)',
          [table_number, customer_name.trim(), total_amount, 'pending', 'unpaid']
        );
      } else {
        throw insertErr;
      }
    }
    const orderId = orderResult.insertId;

    // 2. Insert into tb_orders_items table
    for (const item of items) {
      const productId = item.product_id || item.menu_item_id;
      if (!productId) {
        throw new Error('ID menu/produk tidak terdefinisi');
      }

      // Get current price of product from database to ensure price integrity
      const [product] = await conn.query('SELECT price FROM tb_products WHERE id = ?', [productId]);
      if (product.length === 0) {
        throw new Error(`Produk dengan ID ${productId} tidak ditemukan`);
      }
      const price = parseFloat(product[0].price);

      await conn.query(
        'INSERT INTO tb_orders_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, productId, item.quantity, price]
      );
    }

    await conn.commit();
    conn.release();

    console.log(`\x1b[32m[USER ACTION]\x1b[0m 🔔 Pesanan baru disimpan ke database: Meja ${table_number} (${customer_name.trim()})!`);
    console.log(`   ID Pesanan: ${orderId}`);
    console.log(`   Total: Rp ${total_amount?.toLocaleString('id-ID')}`);
    console.log(`   Items: ${items?.length} item(s)`);

    res.json({
      success: true,
      message: 'Pesanan berhasil dikirim!',
      data: {
        order_id: orderId.toString(), // client looks for result.data.order_id
        id: orderId.toString(),
        table_number,
        customer_name: customer_name.trim(),
        total_amount,
        status: 'pending',
        payment_method: payMethod,
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
    const [existing] = await pool.query('SELECT * FROM tb_admin WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Username sudah terdaftar!' });
    }
    
    // Hash password and insert
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.query(
      'INSERT INTO tb_admin (username, password) VALUES (?, ?)',
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
    const [admins] = await pool.query('SELECT * FROM tb_admin WHERE username = ?', [username]);
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
  const { table_number } = req.query;
  try {
    let queryStr = 'SELECT * FROM tb_orders';
    const params = [];
    if (table_number) {
      queryStr += ' WHERE table_number = ?';
      params.push(parseInt(table_number));
    }
    queryStr += ' ORDER BY order_time DESC';

    const [orders] = await pool.query(queryStr, params);
    if (orders.length === 0) {
      console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 📋 Dashboard kasir menarik semua data pesanan (0 pesanan total).`);
      return res.json({ success: true, data: [] });
    }

    const orderIds = orders.map(o => o.id);
    const [orderItems] = await pool.query(
      `SELECT oi.*, mi.name as name 
       FROM tb_orders_items oi 
       JOIN tb_products mi ON oi.product_id = mi.id 
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
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price)
      });
    });

    const formattedOrders = orders.map(order => ({
      id: order.id.toString(),
      table_number: order.table_number,
      customer_name: order.customer_name,
      total_amount: parseFloat(order.total_amount),
      status: order.status,
      payment_method: order.payment_method || 'cash',
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
    const [orders] = await pool.query('SELECT * FROM tb_orders WHERE id = ?', [id]);
    if (orders.length === 0) {
      console.log(`\x1b[31m[ADMIN ACTION]\x1b[0m ❌ Gagal memperbarui status: Pesanan ID ${id} tidak ditemukan.`);
      return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
    }

    const order = orders[0];
    const oldStatus = order.status;

    await pool.query('UPDATE tb_orders SET status = ? WHERE id = ?', [status, id]);

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

// --- ADMIN QR CODES ENDPOINTS ---

// GET semua QR Code meja terdaftar
app.get('/api/qrcodes', async (req, res) => {
  try {
    const [qrcodes] = await pool.query('SELECT * FROM tb_qrcodes ORDER BY table_number ASC');
    res.json({ success: true, data: qrcodes });
  } catch (error) {
    console.error('Error fetching qrcodes:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data QR Code' });
  }
});

const os = require('os');

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  const candidateIps = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        if (iface.address.startsWith('169.254.')) {
          continue;
        }
        candidateIps.push(iface.address);
      }
    }
  }

  const priorityIp = candidateIps.find(ip => 
    ip.startsWith('192.168.') || 
    ip.startsWith('10.') || 
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)
  );

  return priorityIp || candidateIps[0] || 'localhost';
}

// POST daftarkan QR Code meja baru
app.post('/api/qrcodes', async (req, res) => {
  const { table_number } = req.body;
  if (!table_number) {
    return res.status(400).json({ success: false, message: 'Nomor meja wajib diisi!' });
  }
  
  try {
    const tableNum = parseInt(table_number);
    if (isNaN(tableNum) || tableNum <= 0) {
      return res.status(400).json({ success: false, message: 'Nomor meja harus berupa angka positif!' });
    }

    // Check if table_number already exists
    const [existing] = await pool.query('SELECT * FROM tb_qrcodes WHERE table_number = ?', [tableNum]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: `Meja ${tableNum} sudah terdaftar!` });
    }

    // Generate QR Code URL
    const localIp = getLocalIpAddress();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`http://${localIp}:5173/?meja=${tableNum}`)}`;

    const [result] = await pool.query(
      'INSERT INTO tb_qrcodes (table_number, qr_code_url) VALUES (?, ?)',
      [tableNum, qrCodeUrl]
    );

    console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 🖨️ Meja ${tableNum} didaftarkan dengan QR Code.`);

    res.json({
      success: true,
      message: `Meja ${tableNum} berhasil didaftarkan!`,
      data: {
        id: result.insertId,
        table_number: tableNum,
        qr_code_url: qrCodeUrl
      }
    });
  } catch (error) {
    console.error('Error registering table qrcode:', error);
    res.status(500).json({ success: false, message: 'Gagal mendaftarkan meja' });
  }
});

// DELETE hapus QR Code meja
app.delete('/api/qrcodes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await pool.query('SELECT * FROM tb_qrcodes WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Data QR Code tidak ditemukan' });
    }
    
    await pool.query('DELETE FROM tb_qrcodes WHERE id = ?', [id]);
    console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 🗑️ Meja ${existing[0].table_number} telah dihapus.`);
    
    res.json({ success: true, message: `Meja ${existing[0].table_number} berhasil dihapus!` });
  } catch (error) {
    console.error('Error deleting qrcode:', error);
    res.status(500).json({ success: false, message: 'Gagal menghapus QR Code' });
  }
});

// -----------------------------
// ADMIN: Category CRUD
// -----------------------------

// POST create category
app.post('/api/categories', async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'Nama kategori wajib diisi' });
  try {
    // check duplicate
    const [exists] = await pool.query('SELECT id FROM tb_categories WHERE name = ?', [name]);
    if (exists.length > 0) return res.status(400).json({ success: false, message: 'Kategori sudah ada' });

    const [result] = await pool.query('INSERT INTO tb_categories (name, description) VALUES (?, ?)', [name, description || null]);
    res.json({ success: true, message: 'Kategori berhasil dibuat', data: { id: result.insertId, name, description } });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ success: false, message: 'Gagal membuat kategori' });
  }
});

// PUT update category
app.put('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM tb_categories WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
    await pool.query('UPDATE tb_categories SET name = ?, description = ? WHERE id = ?', [name || rows[0].name, description || rows[0].description, id]);
    res.json({ success: true, message: 'Kategori berhasil diperbarui' });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui kategori' });
  }
});

// DELETE category
app.delete('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM tb_categories WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
    await pool.query('DELETE FROM tb_categories WHERE id = ?', [id]);
    res.json({ success: true, message: 'Kategori berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ success: false, message: 'Gagal menghapus kategori' });
  }
});

// -----------------------------
// ADMIN: Product CRUD
// -----------------------------

// POST create product
app.post('/api/products', async (req, res) => {
  const { name, category_id, price, description, image_url, is_available } = req.body;
  if (!name || !category_id || typeof price === 'undefined') return res.status(400).json({ success: false, message: 'Nama, kategori, dan harga wajib diisi' });
  try {
    const [cat] = await pool.query('SELECT id FROM tb_categories WHERE id = ?', [category_id]);
    if (cat.length === 0) return res.status(400).json({ success: false, message: 'Kategori tidak ditemukan' });

    const [result] = await pool.query(
      'INSERT INTO tb_products (category_id, name, description, price, image_url, is_available) VALUES (?, ?, ?, ?, ?, ?)',
      [category_id, name, description || null, price, image_url || null, is_available ? 1 : 0]
    );
    res.json({ success: true, message: 'Produk berhasil dibuat', data: { id: result.insertId } });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ success: false, message: 'Gagal membuat produk' });
  }
});

// POST upload file (image)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    // Build accessible URL assuming server is at localhost:3001
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ success: true, url, filename: req.file.filename });
  } catch (err) {
    console.error('Error handling upload:', err);
    res.status(500).json({ success: false, message: 'Gagal mengunggah file' });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category_id, price, description, image_url, is_available } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM tb_products WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    const existing = rows[0];
    await pool.query(
      'UPDATE tb_products SET category_id = ?, name = ?, description = ?, price = ?, image_url = ?, is_available = ? WHERE id = ?',
      [category_id || existing.category_id, name || existing.name, description || existing.description, typeof price !== 'undefined' ? price : existing.price, image_url || existing.image_url, typeof is_available !== 'undefined' ? (is_available ? 1 : 0) : existing.is_available, id]
    );
    res.json({ success: true, message: 'Produk berhasil diperbarui' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui produk' });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM tb_products WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    await pool.query('DELETE FROM tb_products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Produk berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ success: false, message: 'Gagal menghapus produk' });
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
        'POST /api/orders',
        'GET /api/tables/:table_number'
      ],
      admin: [
        'POST /api/auth/login',
        'POST /api/auth/register',
        'GET /api/orders',
        'PATCH /api/orders/:id/status',
        'GET /api/qrcodes',
        'POST /api/qrcodes',
        'DELETE /api/qrcodes/:id'
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
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n🚀 QuickOrder Backend API running on http://localhost:${PORT}`);
      console.log(`📋 ENDPOINTS USER (Pelanggan):`);
      console.log(`   GET  /api/categories  - Ambil kategori`);
      console.log(`   GET  /api/menu        - Ambil list menu`);
      console.log(`   POST /api/orders      - Buat pesanan baru`);
      console.log(`   GET  /api/tables/:num - Validasi meja`);
      console.log(`📋 ENDPOINTS ADMIN (Kasir):`);
      console.log(`   POST /api/auth/login  - Login admin`);
      console.log(`   POST /api/auth/register - Register admin`);
      console.log(`   GET  /api/orders      - Lihat semua pesanan`);
      console.log(`   PATCH/api/orders/:id/status - Ubah status pesanan`);
      console.log(`   GET  /api/qrcodes     - Ambil daftar QR Code`);
      console.log(`   POST /api/qrcodes     - Daftarkan meja & QR Code`);
      console.log(`   DELETE/api/qrcodes/:id - Hapus meja & QR Code\n`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to initialize database. Server cannot start:', err.message);
    process.exit(1);
  });
