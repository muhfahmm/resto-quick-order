-- ==========================================================
-- Skema Database untuk Aplikasi QuickOrder Restoran
-- ==========================================================

-- 1. Buat dan Gunakan Database
CREATE DATABASE IF NOT EXISTS db_quickorder;
USE db_quickorder;

-- ==========================================================
-- TABEL 1: tb_admin
-- Fungsi: Menyimpan kredensial login kasir dan admin
-- ==========================================================
CREATE TABLE IF NOT EXISTS tb_admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- Disimpan dalam bentuk Hash (Bcrypt)
) ENGINE=InnoDB;

-- ==========================================================
-- TABEL 2: tb_qrcodes (Meja / QR Code)
-- Fungsi: Menyimpan data meja restoran dan URL QR code
-- ==========================================================
CREATE TABLE IF NOT EXISTS tb_qrcodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL UNIQUE,
    qr_code_url VARCHAR(255) DEFAULT NULL, -- URL file QR code untuk meja ini
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- TABEL 3: tb_categories (Kategori Menu)
-- Fungsi: Mengelompokkan menu (misal: Makanan, Minuman, Snack)
-- ==========================================================
CREATE TABLE IF NOT EXISTS tb_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- TABEL 4: tb_products (Produk / Menu)
-- Fungsi: Menyimpan semua menu yang bisa dipesan pelanggan
-- ==========================================================
CREATE TABLE IF NOT EXISTS tb_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES tb_categories(id) ON DELETE CASCADE,
    INDEX idx_product_category (category_id)
) ENGINE=InnoDB;

-- ==========================================================
-- TABEL 5: tb_orders (Pesanan Masuk)
-- Fungsi: Master data pesanan pelanggan dari sebuah meja
-- ==========================================================
CREATE TABLE IF NOT EXISTS tb_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
    payment_method VARCHAR(50) DEFAULT 'cash',
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_status (status),
    INDEX idx_order_table (table_number)
) ENGINE=InnoDB;

-- ==========================================================
-- TABEL 6: tb_orders_items (Detail Item Pesanan)
-- Fungsi: Mencatat menu apa saja dan berapa jumlah yang dipesan
-- ==========================================================
CREATE TABLE IF NOT EXISTS tb_orders_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL, -- Harga historis (dikunci saat dipesan)
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES tb_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES tb_products(id) ON DELETE CASCADE,
    INDEX idx_order_items_order (order_id)
) ENGINE=InnoDB;
