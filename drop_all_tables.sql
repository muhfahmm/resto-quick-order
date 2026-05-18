-- -------------------------------------------------------------
-- TEARDOWN: drop_all_tables.sql
-- Untuk Menghapus Semua Tabel di db_restaurant_quick_order
-- -------------------------------------------------------------

USE `db_restaurant_quick_order`;

-- Matikan pemeriksaan foreign key sementara agar proses drop lancar tanpa bentrok relasi
SET FOREIGN_KEY_CHECKS = 0;

-- Drop seluruh tabel dalam database
DROP TABLE IF EXISTS `tb_qrcodes`;
DROP TABLE IF EXISTS `tb_order_items`;
DROP TABLE IF EXISTS `tb_orders`;
DROP TABLE IF EXISTS `tb_menu`;
DROP TABLE IF EXISTS `tb_category`;
DROP TABLE IF EXISTS `tb_admin`;

-- Hidupkan kembali pemeriksaan foreign key
SET FOREIGN_KEY_CHECKS = 1;

-- Konfirmasi sukses di terminal phpMyAdmin
SELECT '✅ Semua tabel berhasil dihapus!' AS `Status`;
