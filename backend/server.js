const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require('./src/config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'menu-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Enable connection from any local client
    methods: ["GET", "POST"]
  }
});

// Test database connection at startup
async function testDbConnection() {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('✅ MySQL Database connected successfully via XAMPP!');
  } catch (error) {
    console.error('\n⚠️  WARNING: Could not connect to MySQL database!');
    console.error('👉 Please make sure Apache and MySQL are running in your XAMPP Control Panel.');
    console.error('👉 Ensure you have imported db_restaurant_quick_order.sql into phpMyAdmin.');
    console.error(`👉 Error details: ${error.message}\n`);
  }
}
testDbConnection();

// ==========================================
// REST API ENDPOINTS (MySQL Integration)
// ==========================================

// 1. GET: Fetch all active menus for Customer & Admin
app.get('/api/menu', async (req, res) => {
  try {
    const [menus] = await db.query(`
      SELECT tb_menu.*, tb_category.name as category_name 
      FROM tb_menu 
      LEFT JOIN tb_category ON tb_menu.category_id = tb_category.id
    `);
    // Normalize image URLs so they are accessible from the client's host (not hardcoded to localhost)
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const normalized = menus.map(m => {
      if (!m.image_url) return m;
      // If stored with localhost (e.g. http://localhost:3005/uploads/...), replace host
      if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(m.image_url)) {
        return { ...m, image_url: m.image_url.replace(/^https?:\/\/[^\/]+/, baseUrl) };
      }
      // If stored as relative path like /uploads/..., prefix with baseUrl
      if (m.image_url.startsWith('/uploads')) {
        return { ...m, image_url: baseUrl + m.image_url };
      }
      // Otherwise leave as-is
      return m;
    });

    res.json(normalized);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/menu', upload.single('image'), async (req, res) => {
  try {
    const { name, category_id, price, description } = req.body;
    let imageUrl = req.body.image_url || '';
    
    // If a file was uploaded, construct its URL
    if (req.file) {
      const host = req.get('host');
      const protocol = req.protocol;
      imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const [result] = await db.query(
      'INSERT INTO tb_menu (name, category_id, price, description, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, category_id, price, description || '', imageUrl]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/menu/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, category_id, price, description } = req.body;
    let imageUrl = req.body.image_url; // Might be undefined or a preserved string
    
    if (req.file) {
      const host = req.get('host');
      const protocol = req.protocol;
      imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    // If an image_url is provided (either from new upload or preserved existing one)
    if (imageUrl !== undefined) {
      await db.query(
        'UPDATE tb_menu SET name=?, category_id=?, price=?, description=?, image_url=? WHERE id=?',
        [name, category_id, price, description || '', imageUrl, req.params.id]
      );
    } else {
      await db.query(
        'UPDATE tb_menu SET name=?, category_id=?, price=?, description=? WHERE id=?',
        [name, category_id, price, description || '', req.params.id]
      );
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tb_menu WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Category APIs
app.get('/api/category', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM tb_category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/category', async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await db.query('INSERT INTO tb_category (name) VALUES (?)', [name]);
    res.status(201).json({ success: true, id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/category/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tb_category WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. POST: Admin & Kitchen Staff Login Authentication
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [users] = await db.query('SELECT * FROM tb_admin WHERE username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Username tidak ditemukan' });
    }
    
    const user = users[0];
    
    // For simple local testing, we verify plain password
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Password salah' });
    }
    
    res.json({
      success: true,
      message: 'Login berhasil',
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin Register
app.post('/api/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [existing] = await db.query('SELECT * FROM tb_admin WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Username sudah digunakan' });
    }
    await db.query(
      'INSERT INTO tb_admin (username, password) VALUES (?, ?)',
      [username, password]
    );
    res.status(201).json({ success: true, message: 'Register berhasil' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. POST: Create a new order and save to MySQL (Transactional)
app.post('/api/orders', async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    
    const { tableNo, items, total, customerName } = req.body;
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // 1. Insert into tb_orders
    await connection.query(
      'INSERT INTO tb_orders (id, table_no, customer_name, total_price, status) VALUES (?, ?, ?, ?, ?)',
      [orderId, tableNo, customerName, total, 'pending']
    );
    
    // 2. Insert order details into tb_order_items
    for (const item of items) {
      await connection.query(
        'INSERT INTO tb_order_items (order_id, menu_id, qty, note) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.qty, item.note || '']
      );
    }
    
    await connection.commit();
    
    const completedOrder = {
      id: orderId,
      tableNo,
      items,
      total,
      customerName,
      status: 'pending',
      createdAt: new Date()
    };
    
    // Emit real-time update to Kitchen via WebSockets
    io.emit('kitchen_new_order', completedOrder);
    
    res.status(201).json({ success: true, order: completedOrder });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    connection.release();
  }
});

// Health-check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", message: "Quick Order Restaurant backend is running." });
});

// Real-time connection handler
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`Backend API & WebSocket server running on port ${PORT}`);
});
