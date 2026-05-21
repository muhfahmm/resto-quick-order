// ==============================
// API Service - QuickOrder Restaurant
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
 * Ambil semua kategori dari database
 */
export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) {
    throw new Error('Gagal mengambil data kategori dari database');
  }
  const data = await res.json();
  const apiCats = data.data || [];
  if (!apiCats.some(c => c.id === 0)) {
    return [{ id: 0, name: 'Semua' }, ...apiCats];
  }
  return apiCats;
}

/**
 * Ambil menu items dari database
 */
export async function getMenuItems(categoryId = null) {
  const url = categoryId && categoryId !== 0 
    ? `${API_BASE_URL}/menu?category_id=${categoryId}` 
    : `${API_BASE_URL}/menu`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Gagal mengambil data menu dari database');
  }
  const data = await res.json();
  return data.data;
}

/**
 * Kirim pesanan baru ke database
 */
export async function submitOrder(orderData) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal mengirim pesanan ke database');
  }
  const data = await res.json();
  return data;
}

/**
 * Verifikasi nomor meja di database
 */
export async function validateTable(tableNumber) {
  const res = await fetch(`${API_BASE_URL}/tables/${tableNumber}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Meja ${tableNumber} tidak terdaftar di database`);
  }
  const data = await res.json();
  return data.data;
}
