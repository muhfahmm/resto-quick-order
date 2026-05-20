# Studi Kasus: Aplikasi QuickOrder Restoran

## Latar Belakang & Tujuan
Membuat aplikasi pemesanan mandiri (self-order) untuk restoran di mana pelanggan dapat memesan langsung dari meja tanpa perlu memanggil pelayan atau antri di kasir. Hal ini akan meningkatkan efisiensi waktu, meminimalisir kesalahan pesanan, dan meningkatkan pengalaman pelanggan.

## Alur Kerja (User Journey)
1. **Scan QR Code:** Pelanggan memindai QR Code yang ada di meja mereka (misalnya Meja 11).
2. **Identifikasi Meja:** Sistem secara otomatis mendeteksi dan menampilkan nomor meja tempat pelanggan berada di layar *smartphone* mereka.
3. **Pemesanan Mandiri:**
   - Pelanggan melihat menu yang dibagi berdasarkan tab kategori (Makanan, Minuman, Snack, dll).
   - Pelanggan dapat melihat kartu menu yang berisi foto dan detail produk.
   - Pelanggan menekan tombol "Tambah" untuk memasukkan item ke keranjang. Tombol akan berubah menjadi kontrol kuantitas (`- 1 +`) untuk menyesuaikan jumlah pesanan secara langsung.
4. **Checkout / Kirim Pesanan:** Setelah pesanan dikonfirmasi dari keranjang, data pesanan (detail menu, total harga, dan nomor meja 11) langsung dikirimkan ke *backend* (kasir/dapur) secara *real-time*.

## Analisis Sistem
Sistem ini terbagi menjadi 2 domain antarmuka utama:
1. **Frontend (User View):** Dioptimalkan untuk perangkat *mobile* karena diakses via *smartphone* pengunjung. Berfokus pada kecepatan, visual yang menarik dan interaktif, serta alur pesanan yang sangat simpel tanpa proses registrasi/login bagi pelanggan.
2. **Backend (Admin/Cashier Panel & API):** Berfungsi sebagai penerima pesanan. Kasir memerlukan otentikasi (login) untuk masuk ke panel admin, melihat notifikasi pesanan baru yang masuk dari meja tertentu, dan memproses atau menyelesaikan pesanan tersebut.

## Stack Teknologi yang Digunakan
- **Frontend Pelanggan & Admin Panel:** React JS
- **Backend API:** Node.js (Express)
- **Database:** MySQL
