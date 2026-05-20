# Struktur Folder & Arsitektur Database MySQL

## Struktur Folder Proyek
Pemisahan dilakukan secara modular agar kode rapi, mudah dibaca, dan *scalable*.

```text
/quick_order_restaurant
│
├── /frontend               => Tampilan aplikasi React JS untuk Pelanggan (User)
│   ├── /public             (File favicon, index.html)
│   ├── /src
│   │   ├── /assets         (Gambar statis, logo restoran)
│   │   ├── /components     (Navbar.jsx, TabMenu.jsx, MenuCard.jsx)
│   │   ├── /context        (CartContext untuk mengelola state belanja/tombol - 1 +)
│   │   ├── /pages          (Home.jsx, Cart.jsx, OrderSuccess.jsx)
│   │   ├── /services       (File pemanggilan API Backend dengan Axios/Fetch)
│   │   ├── App.jsx         (Pengaturan Routing Frontend User)
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── /backend                => Sistem API Node.js dan Panel Kasir/Admin
    ├── /admin-panel        => (Sub-folder: Tampilan React JS khusus Kasir/Admin)
    │   ├── /src
    │   │   ├── /pages      (Login.jsx, DashboardKasir.jsx)
    │   │   └── App.jsx     (Routing Admin dengan proteksi login)
    │   └── package.json
    ├── /src                => (Folder utama untuk sistem API/Server Node.js)
    │   ├── /config         (db.js -> koneksi ke MySQL)
    │   ├── /controllers    (authController.js, orderController.js, menuController.js)
    │   ├── /routes         (authRoutes.js, orderRoutes.js)
    │   └── server.js       (Entry point jalannya server API backend)
    ├── database.sql        (Script backup untuk DDL struktur tabel MySQL)
    └── package.json
```

---

## Arsitektur & Skema Database MySQL

Berikut adalah kode *Data Definition Language* (DDL) rapi untuk membuat arsitektur database MySQL yang menampung aliran pesanan dan menu.

```sql
-- 1. Buat dan gunakan database
CREATE DATABASE db_quickorder;
USE db_quickorder;

-- 2. Tabel Admin (Akses Kasir/Panel Admin)
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Harusnya disimpan dalam bentuk HASH (contoh: bcrypt)
    role VARCHAR(20) DEFAULT 'kasir',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Kategori Menu (Makanan, Minuman, Snack)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Produk/Menu
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 5. Tabel Transaksi Utama (Orders dari Meja)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL,  -- Menyimpan data misal Meja 11
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabel Detail Transaksi (Order Items)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL, -- Menyimpan harga saat itu, agar jika harga menu berubah, harga order ini tidak ikut berubah
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);
```

### Penjelasan Relasi:
- **`categories` ke `menu_items`**: *One-to-Many*. Satu kategori punya banyak menu.
- **`orders` ke `order_items`**: *One-to-Many*. Satu pesanan meja berisi banyak item (makanan/minuman).
- **`menu_items` ke `order_items`**: *One-to-Many*. Item pesanan berelasi ke produk untuk mengambil detail terkait.
