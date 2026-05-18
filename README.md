# 🍢 Quick Order Restaurant (Digital QR Menu & Kitchen POS)

Sistem pemesanan makanan cepat saji berbasis QR Code meja pelanggan untuk meminimalkan antrean kasir. Project ini dikembangkan sebagai prototipe premium berdaya guna tinggi dengan konsep **Multi-Role Live Simulation**.

---

## 🌟 Fitur Utama & Wow Factor

Aplikasi ini menggabungkan 3 perspektif utama alur transaksi restoran ke dalam satu antarmuka yang terintegrasi penuh. Anda dapat berpindah peran menggunakan tab switcher di bagian atas secara instan:

### 1. 📱 Perspektif Pelanggan (Meja 05)
- **Menu Digital Responsif**: Kategori menu geser (Semua, Makanan, Minuman, Dessert), kolom pencarian instan, dan list kartu produk berdesain premium.
- **Stok Habis Dinamis**: Jika admin menandai menu sedang habis, tombol pemesanan akan otomatis terkunci dan menampilkan lencana "Habis".
- **Keranjang Belanja Interaktif**: Mengubah jumlah porsi secara langsung, menambahkan instruksi memasak (catatan kustom), dan menghitung subtotal biaya instan.
- **Gerbang Pembayaran QRIS Dinamis**: Simulator checkout menampilkan kode QR dinamis dengan batas waktu pembayaran (countdown timer) serta tombol simulasi bayar berhasil.

### 2. 🍳 Perspektif Dapur (Kitchen POS)
- **Real-Time Order Queue**: Pesanan yang lunas dibayar via QRIS akan otomatis masuk antrean dapur.
- **Cooking Status Manager**: Memandu koki mengubah status pesanan melalui alur kerja: `Menunggu` -> `Masak` -> `Siap Saji` -> `Diantar/Selesai`.
- **Virtual Thermal Printer**: Simulator cetak struk berpenampilan persis kertas thermal kasir dengan opsi cetak fisik menggunakan pintasan `window.print()`.

### 3. 📊 Perspektif Owner / Admin
- **Kartu Statistik Waktu Nyata**: Ringkasan Total Pendapatan Lunas, Jumlah Pesanan Aktif, dan Menu Terlaris yang terupdate otomatis.
- **Bahan Dapur Kosong**: Kontrol sakelar (switch toggle) ketersediaan menu untuk menonaktifkan item jika bahan baku habis.
- **Grafik Tren Penjualan Harian**: Kurva interaktif (Line Chart) yang digambar dinamis menggunakan SVG.
- **Grafik Distribusi Menu Terlaris**: Diagram batang horizontal (Bar Chart) interaktif visual porsi menu terlaris.

### 4. 🔊 Web Audio API Synthesizer (Sound Effects)
- Menghasilkan efek suara interaktif yang realistis langsung dari browser tanpa perlu mengunduh berkas audio eksternal (.mp3/.wav):
  - **Click Chime**: Bunyi klik lembut saat menekan tombol navigasi.
  - **Cart Chime**: Nada pantul ceria saat menambahkan item ke keranjang.
  - **Success Chime**: Melodi riang menanjak naik saat simulasi pembayaran QRIS berhasil.
  - **New Order Alarm**: Sinyal alarm dapur retro dua nada saat pesanan baru masuk antrean.

---

## 🛠️ Rekomendasi Teknologi & Desain

- **Desain**: Glassmorphism premium dengan blur backdrop (`backdrop-filter`), tema gelap neon (Emerald & Cyan glow), serta tipografi modern dari Google Fonts (`Outfit` & `Plus Jakarta Sans`).
- **Frontend Core**: Vanilla HTML5, CSS3, dan Vanilla JavaScript (Zero Dependencies).
- **Audio Synthesizer**: Web Audio API (AudioContext & Oscillators).
- **Visual Charts**: Programmatic SVG generator.

---

## 📂 Struktur Berkas

```
quick_order_restaurant/
├── index.html   # Struktur utama & kontainer 3 mode perspektif
├── style.css    # Desain premium, efek glassmorphism & media cetak struk
├── app.js       # Manajemen state, simulasi socket, sound synth & SVG chart
└── README.md    # Dokumentasi pengoperasian (berkas ini)
```

---

## 🚀 Cara Menjalankan & Menguji Aplikasi

Karena berkas ini sepenuhnya bersifat **self-contained**, Anda tidak membutuhkan server database rumit untuk melihat dan mendemonstrasikannya:

1. Navigasikan ke dalam folder `template-project/quick_order_restaurant`.
2. Klik dua kali berkas `index.html` untuk membukanya di browser web apa pun (Chrome, Edge, Firefox, Safari).
3. **Uji Alur Kerja Lengkap**:
   - Di tab **Pelanggan**, tambahkan beberapa item hidangan ke keranjang, tulis catatan, lalu klik tombol **Bayar Via QRIS Lunas**.
   - Pada jendela modal QRIS, klik **Simulasi Bayar Berhasil (Lunas)**. Dengar melodi pembayaran berhasil!
   - Beralih ke tab **Dapur (Dapur)**. Dengar bel pesanan baru masuk! Di sini pesanan baru Anda telah muncul di daftar antrean.
   - Klik **Masak** untuk mulai memasak, lalu klik **Siap Saji** untuk mengubah status pesanan.
   - Pilih tombol **Struk** pada pesanan, dan lihat kertas struk belanja thermal Anda di panel kanan. Klik **Cetak ke Printer Dapur** untuk memicu kotak dialog cetak browser Anda.
   - Beralih ke tab **Owner/Admin**. Perhatikan statistik pendapatan Anda naik secara waktu nyata, dan grafik SVG Anda ter-update secara otomatis sesuai porsi menu yang dipesan!
   - Pada panel **Manajemen Bahan/Menu Habis**, coba nonaktifkan/matikan menu "Sate Ayam Madura" menjadi **Habis**.
   - Beralih kembali ke tab **Pelanggan**. Perhatikan bahwa menu "Sate Ayam Madura" sekarang berwarna redup dan tombol belinya telah terkunci dengan label "Habis".
