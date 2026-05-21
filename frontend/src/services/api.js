// ==============================
// API Service - QuickOrder Restaurant
// Placeholder: menggunakan data lokal dulu, nanti diganti dengan fetch ke backend
// ==============================

const API_BASE_URL = 'http://localhost:3001/api';

// Import gambar menu
import nasiGoreng from '../assets/nasi-goreng.png';
import mieGoreng from '../assets/mie-goreng.png';
import ayamBakar from '../assets/ayam-bakar.png';
import sateAyam from '../assets/sate-ayam.png';
import steak from '../assets/steak.png';
import esTeh from '../assets/es-teh.png';
import jusJeruk from '../assets/jus-jeruk.png';
import kopiSusu from '../assets/kopi-susu.png';
import milkshake from '../assets/milkshake.png';
import kentang from '../assets/kentang.png';
import wings from '../assets/wings.png';
import onionRings from '../assets/onion-rings.png';

// Mapping gambar ke setiap menu item
const imageMap = {
  '/images/nasi-goreng.jpg': nasiGoreng,
  '/images/mie-goreng.jpg': mieGoreng,
  '/images/ayam-bakar.jpg': ayamBakar,
  '/images/sate-ayam.jpg': sateAyam,
  '/images/steak.jpg': steak,
  '/images/es-teh.jpg': esTeh,
  '/images/jus-jeruk.jpg': jusJeruk,
  '/images/kopi-susu.jpg': kopiSusu,
  '/images/milkshake.jpg': milkshake,
  '/images/kentang.jpg': kentang,
  '/images/wings.jpg': wings,
  '/images/onion-rings.jpg': onionRings,
};

// Data kategori lokal
const localCategories = [
  { id: 0, name: 'Semua' },
  { id: 1, name: 'Makanan' },
  { id: 2, name: 'Minuman' },
  { id: 3, name: 'Snack' },
];

// Data menu lokal (sama dengan backend)
const localMenuItems = [
  { id: 1, category_id: 1, name: 'Nasi Goreng Spesial', description: 'Nasi goreng dengan telur, ayam, dan sayuran segar', price: 35000, image_url: '/images/nasi-goreng.jpg', is_available: true },
  { id: 2, category_id: 1, name: 'Mie Goreng Seafood', description: 'Mie goreng dengan udang, cumi, dan bumbu spesial', price: 38000, image_url: '/images/mie-goreng.jpg', is_available: true },
  { id: 3, category_id: 1, name: 'Ayam Bakar Madu', description: 'Ayam bakar dengan saus madu pilihan chef', price: 45000, image_url: '/images/ayam-bakar.jpg', is_available: true },
  { id: 4, category_id: 1, name: 'Sate Ayam', description: '10 tusuk sate ayam dengan bumbu kacang', price: 30000, image_url: '/images/sate-ayam.jpg', is_available: true },
  { id: 5, category_id: 1, name: 'Steak Sapi', description: 'Steak sapi premium dengan saus black pepper', price: 75000, image_url: '/images/steak.jpg', is_available: true },
  { id: 6, category_id: 2, name: 'Es Teh Manis', description: 'Teh manis segar dengan es batu', price: 8000, image_url: '/images/es-teh.jpg', is_available: true },
  { id: 7, category_id: 2, name: 'Jus Jeruk', description: 'Jus jeruk segar tanpa pengawet', price: 15000, image_url: '/images/jus-jeruk.jpg', is_available: true },
  { id: 8, category_id: 2, name: 'Kopi Susu', description: 'Kopi susu gula aren khas resto', price: 22000, image_url: '/images/kopi-susu.jpg', is_available: true },
  { id: 9, category_id: 2, name: 'Milkshake Coklat', description: 'Milkshake coklat premium dengan whipped cream', price: 28000, image_url: '/images/milkshake.jpg', is_available: true },
  { id: 10, category_id: 3, name: 'Kentang Goreng', description: 'Kentang goreng crispy dengan saus sambal mayo', price: 20000, image_url: '/images/kentang.jpg', is_available: true },
  { id: 11, category_id: 3, name: 'Chicken Wings', description: '6 pcs sayap ayam goreng bumbu BBQ', price: 32000, image_url: '/images/wings.jpg', is_available: true },
  { id: 12, category_id: 3, name: 'Onion Rings', description: 'Bawang goreng tepung crispy', price: 18000, image_url: '/images/onion-rings.jpg', is_available: true },
];

/**
 * Resolves image path — returns the imported asset for local images
 */
export function getMenuImage(imageUrl) {
  return imageMap[imageUrl] || imageUrl;
}

/**
 * Format harga ke Rupiah
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Ambil semua kategori
 */
export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    const data = await res.json();
    // Tambahkan opsi 'Semua' (id: 0) di awal jika belum ada
    const apiCats = data.data || [];
    if (!apiCats.some(c => c.id === 0)) {
      return [{ id: 0, name: 'Semua' }, ...apiCats];
    }
    return apiCats;
  } catch (error) {
    console.warn('Backend API /categories offline, menggunakan fallback lokal');
    return localCategories;
  }
}

/**
 * Ambil menu items, bisa filter by category_id
 */
export async function getMenuItems(categoryId = null) {
  try {
    const url = categoryId && categoryId !== 0 
      ? `${API_BASE_URL}/menu?category_id=${categoryId}` 
      : `${API_BASE_URL}/menu`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Backend API /menu offline, menggunakan fallback lokal');
    if (categoryId && categoryId !== 0) {
      return localMenuItems.filter(item => item.category_id === categoryId);
    }
    return localMenuItems;
  }
}


/**
 * Kirim pesanan baru
 */
export async function submitOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    // Fallback jika backend belum jalan
    console.warn('Backend belum aktif, menggunakan fallback lokal');
    return {
      success: true,
      message: 'Pesanan berhasil dikirim!',
      data: {
        order_id: Date.now(),
        table_number: orderData.table_number,
        total_amount: orderData.total_amount,
        status: 'pending',
        order_time: new Date().toISOString(),
      }
    };
  }
}
