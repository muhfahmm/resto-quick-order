-- ==========================================================
-- Skema Database untuk Aplikasi QuickOrder Restoran
-- ==========================================================

-- 1. Buat dan Gunakan Database
CREATE DATABASE IF NOT EXISTS db_quickorder;
USE db_quickorder;

-- ==========================================================
-- TABEL 1: admins
-- Fungsi: Menyimpan kredensial login kasir dan admin
-- ==========================================================
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Disimpan dalam bentuk Hash (Bcrypt)
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'kasir') DEFAULT 'kasir',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- TABEL 2: tables (Meja)
-- Fungsi: Menyimpan data meja restoran
-- ==========================================================
CREATE TABLE IF NOT EXISTS tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL UNIQUE,
    status ENUM('available', 'occupied', 'reserved') DEFAULT 'available',
    qr_code_url VARCHAR(255) DEFAULT NULL, -- URL file QR code untuk meja ini
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- TABEL 3: categories (Kategori Menu)
-- Fungsi: Mengelompokkan menu (misal: Makanan, Minuman, Snack)
-- ==========================================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- TABEL 4: menu_items (Produk)
-- Fungsi: Menyimpan semua menu yang bisa dipesan pelanggan
-- ==========================================================
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Membuat index untuk mempercepat pencarian berdasarkan kategori
CREATE INDEX idx_menu_category ON menu_items(category_id);

-- ==========================================================
-- TABEL 5: orders (Pesanan Masuk)
-- Fungsi: Master data pesanan pelanggan dari sebuah meja
-- ==========================================================
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Membuat index agar dashboard kasir lebih cepat me-load status pesanan
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_table ON orders(table_number);

-- ==========================================================
-- TABEL 6: order_items (Detail Item Pesanan)
-- Fungsi: Mencatat menu apa saja dan berapa jumlah yang dipesan
-- ==========================================================
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL, -- Harga historis (dikunci saat dipesan)
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Index pada order_id agar pengambilan keranjang cepat
CREATE INDEX idx_order_items_order ON order_items(order_id);


-- ==========================================================
-- DUMMY DATA SEEDING (Untuk keperluan awal/testing)
-- ==========================================================

-- 1. Insert Data Admin
INSERT INTO admins (username, password, name, role) VALUES 
('admin_kasir', '$2b$10$wN31rO4H6HqI1nE4WcWq/ej2YjN.kU.h3jA7B0hP1P8y.pEwXG0Uq', 'Kasir Utama', 'kasir'); -- password 'password' di-hash

-- 2. Insert Kategori
INSERT INTO categories (name, description) VALUES 
('Makanan', 'Hidangan utama dan lauk'),
('Minuman', 'Minuman segar, kopi, dan jus'),
('Snack', 'Camilan dan makanan ringan');

-- 3. Insert Meja Dummy
INSERT INTO tables (table_number) VALUES 
(1), (2), (3), (4), (10), (11);

-- 4. Insert Menu
INSERT INTO menu_items (category_id, name, description, price, image_url, is_available) VALUES 
(1, 'Nasi Goreng Spesial', 'Nasi goreng dengan telur, sosis, dan ayam', 25000.00, 'nasigoreng.jpg', true),
(1, 'Ayam Bakar Madu', 'Ayam bakar dengan bumbu madu pedas manis', 30000.00, 'ayambakar.jpg', true),
(2, 'Es Teh Manis', 'Es teh manis segar pelepas dahaga', 5000.00, 'esteh.jpg', true),
(2, 'Jus Alpukat', 'Jus alpukat kental dengan susu cokelat', 15000.00, 'jusalpukat.jpg', true),
(3, 'Kentang Goreng', 'Kentang goreng renyah bumbu BBQ', 12000.00, 'kentang.jpg', true);
