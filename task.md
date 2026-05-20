# Task / Rencana Eksekusi

Berikut adalah daftar tugas langkah demi langkah untuk mengeksekusi pembuatan aplikasi QuickOrder secara terstruktur:

## Fase 1: Setup & Inisialisasi Proyek
- [ ] Inisialisasi folder root proyek (berisi frontend & backend).
- [ ] **Database:** Membuat database MySQL dan mengeksekusi *script* SQL untuk tabel Admin, Meja, Kategori, Produk, dan Pesanan.
- [ ] **Backend:** Setup Node.js + Express, install *dependencies* (`mysql2`, `express`, `cors`, `jsonwebtoken`), dan menghubungkan *backend* ke database MySQL.
- [ ] **Frontend User:** Inisialisasi proyek React JS (dengan Vite/CRA) beserta library styling (Tailwind CSS atau Pure CSS) dan *routing* (`react-router-dom`).
- [ ] **Frontend Admin:** Inisialisasi sub-proyek React JS di dalam folder *backend* untuk panel kasir.

## Fase 2: Pengembangan API Backend (Node.js + MySQL)
- [ ] API Auth: Membuat endpoint Login untuk kasir/admin.
- [ ] API Master Data: Membuat endpoint untuk mengelola Menu (get, post) dan Kategori (get, post).
- [ ] API Pesanan: Membuat endpoint untuk POST pesanan baru dari meja, dan GET semua pesanan untuk panel kasir.

## Fase 3: Pengembangan Admin Panel / Kasir (React JS)
- [ ] Membuat halaman Login Admin.
- [ ] Membuat *Layout* Admin dan mengamankannya dengan mekanisme *Private Route* (mengecek token login).
- [ ] Membuat halaman *Dashboard* Kasir untuk memonitor pesanan masuk (tampil nomor meja, status, detail item pesanan).
- [ ] (Opsional) Halaman manajemen menu untuk menambah foto produk dan mengubah harga.

## Fase 4: Pengembangan Frontend Pelanggan (React JS)
- [ ] *Routing* & Identifikasi Meja: Membaca parameter meja (contoh: `?meja=11`) untuk *state* aplikasi.
- [ ] **Komponen UI Utama:**
  - [ ] Navbar (dengan nama restoran / keranjang).
  - [ ] Tab Menu (untuk menyaring berdasarkan kategori).
  - [ ] Card Menu (gambar produk, harga, nama).
- [ ] **Interaksi state keranjang (Cart):**
  - [ ] Membuat tombol "Tambah".
  - [ ] Logika ubah tombol menjadi kontrol kuantitas (`- 1 +`) saat item sudah ada di keranjang.
- [ ] Fitur Keranjang Belanja: Halaman ringkasan order dan total harga.
- [ ] Proses Checkout: Menembak API *backend* dan menampilkan halaman sukses "Pesanan Sedang Diproses".

## Fase 5: Integrasi & Finalisasi
- [ ] Menghubungkan semua fungsi *fetch* di Frontend ke URL API Backend.
- [ ] Uji coba End-to-End: Scan Meja -> Pesan Menu -> Ubah Kuantitas -> Checkout -> Pesanan Muncul di Panel Kasir.
- [ ] *Polishing* UI agar terlihat *premium* dan modern.
