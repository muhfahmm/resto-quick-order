const express = require('express');
const cors = require('cors');

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

  // User endpoints: categories list, menu list, POST order
  const isUser = path === '/api/categories' || 
                 path === '/api/menu' || 
                 (path === '/api/orders' && method === 'POST');

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
// DUMMY DATA (Placeholder)
// Data ini akan diganti dengan query MySQL di fase backend
// ==============================
const categories = [
  { id: 1, name: 'Makanan' },
  { id: 2, name: 'Minuman' },
  { id: 3, name: 'Snack' },
];

const menuItems = [
  { id: 1, category_id: 1, name: 'Nasi Goreng Spesial', description: 'Nasi goreng dengan telur, ayam, dan sayuran segar', price: 35000, image_url: '/images/nasi-goreng.jpg', is_available: true },
  { id: 2, category_id: 1, name: 'Mie Goreng Seafood', description: 'Mie goreng dengan udang, cumi, dan bumbu spesial', price: 38000, image_url: '/images/mie-goreng.jpg', is_available: true },
  { id: 3, category_id: 1, name: 'Ayam Bakar Madu', description: 'Ayam bakar dengan saus madu pilihan chef', price: 45000, image_url: '/images/ayam-bakar.jpg', is_available: true },
  { id: 4, category_id: 1, name: 'Sate Ayam', description: '10 tusuk sate ayam dengan bumbu kacang', price: 30000, image_url: '/images/sate-ayam.jpg', is_available: true },
  { id: 5, category_id: 1, name: 'Steak Sapi', description: 'Steak sapi premium dengan saus black pepper', price: 75000, image_url: '/images/steak.jpg', is_available: true },
  { id: 6, category_id: 2, name: 'Es Teh Manis', description: 'Teh manis segar dengan es batu', price: 8000, image_url: '/images/es-teh.jpg', is_available: true },
  { id: 7, category_id: 2, name: 'Jus Jeruk', description: 'Jus jeruk segar tanpa pengawet', price: 15000, image_url: '/images/jus-jeruk.jpg', is_available: true },
  { id: 8, category_id: 2, name: 'Kopi Susu', description: 'Kopi susu gula aren khas resto', price: 22000, image_url: '/images/kopi-susu.jpg', is_available: true },
  { id: 9, category_id: 2, name: 'Milkshake Coklat', description: 'Milkshake coklat premium dengan whipped cream', price: 28000, image_url: '/images/milkshake.jpg', is_available: true },
  { id: 10, category_id: 3, name: 'Kentang Goreng', description: 'Kentang goreng crispy dengan saus sambal mayo', price: 20000, image_url: '/images/kentang.jpg', is_available: true },
  { id: 11, category_id: 3, name: 'Chicken Wings', description: '6 pcs sayap ayam goreng bumbu BBQ', price: 32000, image_url: '/images/wings.jpg', is_available: true },
  { id: 12, category_id: 3, name: 'Onion Rings', description: 'Bawang goreng tepung crispy', price: 18000, image_url: '/images/onion-rings.jpg', is_available: true },
];

// In-memory Orders storage (Placeholder for database)
let orders = [];

// ==============================
// API ROUTES
// ==============================

// --- USER (CUSTOMER) ENDPOINTS ---

// GET semua kategori
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

// GET semua menu (bisa filter by category_id)
app.get('/api/menu', (req, res) => {
  const { category_id } = req.query;
  let filtered = menuItems;
  if (category_id) {
    filtered = menuItems.filter(item => item.category_id === parseInt(category_id));
  }
  res.json({ success: true, data: filtered });
});

// POST pesanan baru dari meja
app.post('/api/orders', (req, res) => {
  const { table_number, items, total_amount } = req.body;
  const newOrder = {
    id: Date.now().toString(),
    table_number,
    items,
    total_amount,
    status: 'pending',
    order_time: new Date().toISOString()
  };

  orders.push(newOrder);

  console.log(`\x1b[32m[USER ACTION]\x1b[0m 🔔 Pesanan baru diterima dari Meja ${table_number}!`);
  console.log(`   ID Pesanan: ${newOrder.id}`);
  console.log(`   Total: Rp ${total_amount?.toLocaleString('id-ID')}`);
  console.log(`   Items: ${items?.length} item(s)`);

  res.json({
    success: true,
    message: 'Pesanan berhasil dikirim!',
    data: newOrder
  });
});

// --- ADMIN (KASIR) ENDPOINTS ---

// POST login kasir/admin
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Login dummy
  if (username === 'admin' && password === 'admin123') {
    console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 🔑 Login berhasil untuk admin: "${username}"`);
    res.json({
      success: true,
      message: 'Login berhasil!',
      token: 'dummy-jwt-token-quickorder',
      user: { username: 'admin', name: 'Kasir Utama', role: 'admin' }
    });
  } else {
    console.log(`\x1b[31m[ADMIN ACTION]\x1b[0m ❌ Percobaan login gagal untuk admin: "${username}"`);
    res.status(401).json({
      success: false,
      message: 'Username atau password salah!'
    });
  }
});

// GET semua pesanan (dashboard kasir)
app.get('/api/orders', (req, res) => {
  console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m 📋 Dashboard kasir menarik semua data pesanan (${orders.length} pesanan total).`);
  res.json({ success: true, data: orders });
});

// PATCH update status pesanan (diproses, selesai, dibatalkan)
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const order = orders.find(o => o.id === id);
  if (!order) {
    console.log(`\x1b[31m[ADMIN ACTION]\x1b[0m ❌ Gagal memperbarui status: Pesanan ID ${id} tidak ditemukan.`);
    return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
  }

  const oldStatus = order.status;
  order.status = status;

  console.log(`\x1b[36m[ADMIN ACTION]\x1b[0m ✏️ Pesanan ID ${id} diperbarui: [${oldStatus}] ➔ [\x1b[33m${status}\x1b[0m]`);

  res.json({
    success: true,
    message: `Status pesanan berhasil diubah menjadi ${status}`,
    data: order
  });
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
// START SERVER
// ==============================
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

