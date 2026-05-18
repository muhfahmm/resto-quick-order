const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();
app.use(cors());
app.use(express.json());

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
    const [menus] = await db.query('SELECT * FROM tb_menu');
    res.json(menus);
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
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
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
