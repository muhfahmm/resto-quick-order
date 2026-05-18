-- -------------------------------------------------------------
-- DATABASE: db_restaurant_quick_order (CLEAN SCHEMA)
-- Untuk XAMPP MySQL (Tanpa Data Seeder / Bersih Tanpa INSERT INTO)
-- -------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `db_restaurant_quick_order`;
USE `db_restaurant_quick_order`;

-- 1. TABEL: tb_admin (Untuk Akun Masuk Staf & Admin)
CREATE TABLE IF NOT EXISTS `tb_admin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2A. TABEL: tb_category (Kategori Produk)
CREATE TABLE IF NOT EXISTS `tb_category` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2B. TABEL: tb_menu (Untuk Daftar Makanan & Minuman Dikelola Admin)
CREATE TABLE IF NOT EXISTS `tb_menu` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `category_id` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `is_available` TINYINT(1) NOT NULL DEFAULT 1,
  FOREIGN KEY (`category_id`) REFERENCES `tb_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. TABEL: tb_orders (Untuk Menyimpan Transaksi Utama QRIS)
CREATE TABLE IF NOT EXISTS `tb_orders` (
  `id` VARCHAR(20) PRIMARY KEY, -- format: ORD-XXXX
  `table_no` VARCHAR(10) NOT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'cooking', 'ready', 'completed') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. TABEL: tb_order_items (Untuk Menyimpan Detail Makanan per Transaksi)
CREATE TABLE IF NOT EXISTS `tb_order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` VARCHAR(20) NOT NULL,
  `menu_id` INT NOT NULL,
  `qty` INT NOT NULL DEFAULT 1,
  `note` VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `tb_orders` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`menu_id`) REFERENCES `tb_menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. TABEL: tb_qrcodes (Untuk Menyimpan Data QR Code Meja yang Digenerate)
CREATE TABLE IF NOT EXISTS `tb_qrcodes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `table_no` VARCHAR(10) NOT NULL UNIQUE,
  `qr_code_url` VARCHAR(255) NOT NULL,      -- Alamat web, misal: https://rasalegendaris.com/menu?table=05
  `qr_image_path` VARCHAR(255) DEFAULT NULL, -- Path fisik berkas gambar QR Code di server
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;