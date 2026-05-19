const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require('./src/config/db');
const QRCode = require('qrcode');

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
    
    // Add payment_method column dynamically if it does not exist
    try {
      await db.query("ALTER TABLE tb_orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'Dana'");
      console.log('✅ Added payment_method column to tb_orders table successfully.');
    } catch (err) {
      // Ignored if column already exists
    }

    // Modify status column dynamically from ENUM to VARCHAR(20) to support 'confirmed' status
    try {
      await db.query("ALTER TABLE tb_orders MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending'");
      console.log('✅ Modified status column of tb_orders to VARCHAR(20) successfully.');
    } catch (err) {
      console.error('⚠️ Failed to alter status column of tb_orders:', err.message);
    }

    // Create tb_reservations table dynamically if it does not exist
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS tb_reservations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          table_no INT NOT NULL,
          reservation_date DATE NOT NULL,
          reservation_time TIME NOT NULL,
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      console.log('✅ Created tb_reservations table successfully.');
    } catch (err) {
      console.error('⚠️ Failed to create tb_reservations table:', err.message);
    }
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

app.put('/api/category/:id', async (req, res) => {
  try {
    const { name } = req.body;
    await db.query('UPDATE tb_category SET name = ? WHERE id = ?', [name, req.params.id]);
    res.json({ success: true, id: req.params.id, name });
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
    
    const { tableNo, items, total, customerName, paymentMethod } = req.body;
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // 1. Insert into tb_orders
    await connection.query(
      'INSERT INTO tb_orders (id, table_no, customer_name, total_price, status, payment_method) VALUES (?, ?, ?, ?, ?, ?)',
      [orderId, tableNo, customerName, total, 'pending', paymentMethod || 'Dana']
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
      paymentMethod: paymentMethod || 'Dana',
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

app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await db.query(
      'SELECT id, table_no, customer_name, total_price, status, created_at FROM tb_orders ORDER BY created_at DESC'
    );

    if (orders.length === 0) {
      return res.json([]);
    }

    const orderIds = orders.map(order => order.id);
    const [items] = await db.query(
      `SELECT oi.order_id, oi.menu_id, oi.qty, oi.note, m.name AS menu_name, m.price AS menu_price
       FROM tb_order_items oi
       LEFT JOIN tb_menu m ON oi.menu_id = m.id
       WHERE oi.order_id IN (?)`,
      [orderIds]
    );

    const itemsByOrder = items.reduce((acc, item) => {
      acc[item.order_id] = acc[item.order_id] || [];
      acc[item.order_id].push({
        menu_id: item.menu_id,
        name: item.menu_name,
        qty: item.qty,
        price: item.menu_price,
        note: item.note
      });
      return acc;
    }, {});

    const result = orders.map(order => ({
      ...order,
      items: itemsByOrder[order.id] || [],
      item_count: (itemsByOrder[order.id] || []).reduce((sum, item) => sum + item.qty, 0)
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'ready', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid order status' });
    }

    const [result] = await db.query('UPDATE tb_orders SET status = ? WHERE id = ?', [status, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tb_order_items WHERE order_id = ?', [req.params.id]);
    await db.query('DELETE FROM tb_orders WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health-check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", message: "Quick Order Restaurant backend is running." });
});

// List all generated QR codes
app.get('/api/qrcodes', async (req, res) => {
  try {
    const [qrcodes] = await db.query('SELECT * FROM tb_qrcodes ORDER BY created_at DESC');
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const normalized = qrcodes.map(qr => {
      if (qr.qr_image_path && qr.qr_image_path.startsWith('/uploads')) {
        return { ...qr, qr_image_path: `${baseUrl}${qr.qr_image_path}` };
      }
      return qr;
    });
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/qrcodes/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tb_qrcodes WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate QR code PNG for a table identifier
app.get('/api/qrcode/:table', async (req, res) => {
  try {
    const table = req.params.table;
    const host = req.get('host').split(':')[0];
    const frontendPort = process.env.FRONTEND_PORT || 5173;
    const targetUrl = `${req.protocol}://${host}:${frontendPort}/?table=${encodeURIComponent(table)}`;

    const buffer = await QRCode.toBuffer(targetUrl, { type: 'png', width: 360, margin: 2 });

    const qrcodeDir = path.join(__dirname, 'uploads', 'qrcodes');
    if (!fs.existsSync(qrcodeDir)) {
      fs.mkdirSync(qrcodeDir, { recursive: true });
    }

    const fileName = `qr-table-${table}-${Date.now()}.png`;
    const filePath = path.join(qrcodeDir, fileName);
    const dbImagePath = `/uploads/qrcodes/${fileName}`;
    fs.writeFileSync(filePath, buffer);

    await db.query(
      'INSERT INTO tb_qrcodes (table_no, qr_code_url, qr_image_path) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE qr_code_url=VALUES(qr_code_url), qr_image_path=VALUES(qr_image_path), created_at=CURRENT_TIMESTAMP',
      [table, targetUrl, dbImagePath]
    );

    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// TABLE RESERVATIONS API ENDPOINTS
// ==========================================

// 1. GET: Fetch all reservations for Admin Dashboard
app.get('/api/reservations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tb_reservations ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. POST: Create a new reservation from Customer Portal
app.post('/api/reservations', async (req, res) => {
  try {
    const { name, phone, table_no, reservation_date, reservation_time } = req.body;
    if (!name || !phone || !table_no || !reservation_date || !reservation_time) {
      return res.status(400).json({ success: false, message: 'Semua kolom data reservasi wajib diisi.' });
    }
    const [result] = await db.query(
      'INSERT INTO tb_reservations (name, phone, table_no, reservation_date, reservation_time, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone, table_no, reservation_date, reservation_time, 'pending']
    );
    
    const newRes = {
      id: result.insertId,
      name,
      phone,
      table_no,
      reservation_date,
      reservation_time,
      status: 'pending',
      created_at: new Date()
    };
    
    // Notify admin dashboard in real-time
    io.emit('new_reservation', newRes);
    
    res.status(201).json({ success: true, reservation: newRes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. PUT: Update reservation status (Confirm / Cancel)
app.put('/api/reservations/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status wajib ditentukan.' });
    }
    await db.query('UPDATE tb_reservations SET status = ? WHERE id = ?', [status, req.params.id]);
    
    // Broadcast status change to real-time clients if helpful
    io.emit('reservation_status_changed', { id: req.params.id, status });
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. DELETE: Delete a reservation
app.delete('/api/reservations/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tb_reservations WHERE id = ?', [req.params.id]);
    io.emit('reservation_deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
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
