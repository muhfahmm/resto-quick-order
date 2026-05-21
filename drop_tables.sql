-- ==========================================================
-- Script untuk Menghapus Semua Tabel (Hati-hati!)
-- Eksekusi file ini jika ingin mereset ulang struktur database
-- ==========================================================

USE db_quickorder;

-- Mematikan sementara pengecekan Foreign Key agar tidak ada error saat drop
SET FOREIGN_KEY_CHECKS = 0;

-- Hapus tabel dengan urutan dari child ke parent (detail ke master)
DROP TABLE IF EXISTS tb_orders_items;
DROP TABLE IF EXISTS tb_orders;
DROP TABLE IF EXISTS tb_products;
DROP TABLE IF EXISTS tb_categories;
DROP TABLE IF EXISTS tb_qrcodes;
DROP TABLE IF EXISTS tb_admin;

-- Menyalakan kembali pengecekan Foreign Key
SET FOREIGN_KEY_CHECKS = 1;
