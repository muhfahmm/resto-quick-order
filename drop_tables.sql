-- ==========================================================
-- Script untuk Menghapus Semua Tabel (Hati-hati!)
-- Eksekusi file ini jika ingin mereset ulang struktur database
-- ==========================================================

USE db_quickorder;

-- Mematikan sementara pengecekan Foreign Key agar tidak ada error saat drop
SET FOREIGN_KEY_CHECKS = 0;

-- Hapus tabel dengan urutan dari child ke parent (detail ke master)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS admins;

-- Menyalakan kembali pengecekan Foreign Key
SET FOREIGN_KEY_CHECKS = 1;
