# Task / Rencana Eksekusi

Berikut adalah daftar tugas langkah demi langkah untuk mengeksekusi pembuatan aplikasi QuickOrder secara terstruktur:

## Fase 1: Setup & Inisialisasi Proyek
- [x] Inisialisasi folder root proyek (berisi frontend & backend).
- [x] **Database:** Membuat database MySQL dan mengeksekusi *script* SQL untuk tabel Admin, Meja, Kategori, Produk, dan Pesanan.
- [x] **Backend:** Setup Node.js + Express, install *dependencies* (`mysql2`, `express`, `cors`, `jsonwebtoken`), dan menghubungkan *backend* ke database MySQL.
- [x] **Frontend User:** Inisialisasi proyek React JS (dengan Vite/CRA) beserta library styling (Tailwind CSS atau Pure CSS) dan *routing* (`react-router-dom`).
- [x] **Frontend Admin:** Inisialisasi sub-proyek React JS di dalam folder *backend* untuk panel kasir.

## Fase 2: Pengembangan API Backend (Node.js + MySQL)
- [x] API Auth: Membuat endpoint Login untuk kasir/admin.
- [x] API Master Data: Membuat endpoint untuk mengelola Menu (get) dan Kategori (get).
- [x] API Pesanan: Membuat endpoint untuk POST pesanan baru dari meja, dan GET semua pesanan untuk panel kasir.

## Fase 3: Pengembangan Admin Panel / Kasir (React JS)
- [x] Membuat halaman Login Admin.
- [x] Membuat *Layout* Admin dan mengamankannya dengan mekanisme *Private Route* (mengecek token login).
- [x] Membuat halaman *Dashboard* Kasir untuk memonitor pesanan masuk (tampil nomor meja, status, detail item pesanan dengan nama menu terintegrasi).

## Fase 4: Pengembangan Frontend Pelanggan (React JS)
- [x] *Routing* & Identifikasi Meja: Membaca parameter meja (contoh: `?meja=11`) untuk *state* aplikasi.
- [x] **Komponen UI Utama:**
  - [x] Navbar (dengan nama restoran / keranjang).
  - [x] Tab Menu (untuk menyaring berdasarkan kategori).
  - [x] Card Menu (gambar produk, harga, nama).
- [x] **Interaksi state keranjang (Cart):**
  - [x] Membuat tombol "Tambah".
  - [x] Logika ubah tombol menjadi kontrol kuantitas (`- 1 +`) saat item sudah ada di keranjang.
- [x] Fitur Keranjang Belanja: Halaman ringkasan order dan total harga.
- [x] Proses Checkout: Menembak API *backend* dan menampilkan halaman sukses "Pesanan Sedang Diproses".

## Fase 5: Integrasi & Finalisasi
- [x] Menghubungkan semua fungsi *fetch* di Frontend ke URL API Backend.
- [x] Uji coba End-to-End: Scan Meja -> Pesan Menu -> Ubah Kuantitas -> Checkout -> Pesanan Muncul di Panel Kasir.
- [x] *Polishing* UI agar terlihat *premium* dan modern.
