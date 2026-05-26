import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TabMenu from '../components/TabMenu';
import MenuCard from '../components/MenuCard';
import CameraScanner from '../components/CameraScanner';
import { useCart } from '../context/CartContext';
import { getCategories, getMenuItems, formatPrice, validateTable } from '../services/api';

function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawTable = searchParams.get('meja');
  const tableNumber = (rawTable && rawTable !== 'null' && rawTable !== 'undefined') ? rawTable : null;

  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (tableNumber) {
      console.log(`%c[USER ACCESS] Mengakses Halaman Menu Utama - Meja: ${tableNumber}`, 'color: #4caf50; font-weight: bold; font-size: 12px;');
    } else {
      console.log(`%c[USER ACCESS] Mengakses Halaman Menu Utama - Tanpa Scan QR Code`, 'color: #fbbf24; font-weight: bold; font-size: 12px;');
    }
  }, [tableNumber]);

  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedOnceRef = useRef(false);
  
  // Use useRef untuk avoid triggering useEffect dependency
  const lastInteractionTimeRef = useRef(0);
  const pollingTimeoutRef = useRef(null);

  const handleScanSuccess = (decodedText) => {
    let scannedTable = '';
    
    // Check if the decoded text is a URL
    if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
      try {
        const url = new URL(decodedText);
        scannedTable = url.searchParams.get('meja') || '';
      } catch (e) {
        console.error("Gagal memparsing URL QR Code:", e);
      }
    } else {
      // Direct raw table number
      scannedTable = decodedText.trim();
    }
    
    if (scannedTable) {
      console.log(`%c[QR SCAN SUCCESS] Mendapatkan meja: ${scannedTable}`, 'color: #34d399; font-weight: bold;');
      navigate(`/?meja=${scannedTable}`);
      setShowScanner(false);
    } else {
      alert("QR Code tidak valid. Pastikan QR Code berisi nomor meja yang valid.");
    }
  };

  const { totalItems, totalPrice } = useCart();

  // Handle user interaction untuk pause polling
  const handleMenuInteraction = () => {
    lastInteractionTimeRef.current = Date.now();
    // Clear any pending polling timeout
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  };

  // Fetch categories & menu items
  useEffect(() => {
    let active = true;
    let intervalId;

    async function loadData({ showLoading } = { showLoading: true }) {
      if (showLoading) setLoading(true);
      // Jangan reset error saat silent refresh biar UI stabil
      if (showLoading) setError(null);
      try {
        if (!active) return;
        // 1. Ambil data kategori dan menu
        const cats = await getCategories();
        if (!active) return;
        setCategories(cats);

        const items = await getMenuItems(activeCategory === 0 ? null : activeCategory);
        if (!active) return;
        setMenuItems(items);
      } catch (err) {
        console.error('Gagal memuat data:', err);
        if (!active) return;
        // Pada silent refresh, jangan "menghancurkan" UI dengan error banner.
        if (showLoading) setError(err.message);
      } finally {
        if (!active) return;
        if (showLoading) setLoading(false);
        hasLoadedOnceRef.current = true;
      }
    }

    // Initial / category-change load: tampilkan loading hanya saat pertama kali
    loadData({ showLoading: !hasLoadedOnceRef.current });

    // Setup polling - cek setiap 5 detik apakah boleh fetch atau tidak
    const startPolling = () => {
      if (!active) return;
      
      // Check if pause period is still active (3 detik setelah last interaction)
      const timeSinceLastInteraction = Date.now() - lastInteractionTimeRef.current;
      
      if (timeSinceLastInteraction > 3000) {
        // Pause period sudah selesai, boleh polling
        // Silent refresh supaya tidak terlihat seperti refresh halaman
        loadData({ showLoading: false });
      }
      
      // Schedule next check
      pollingTimeoutRef.current = setTimeout(startPolling, 5000);
    };

    pollingTimeoutRef.current = setTimeout(startPolling, 5000);

    return () => {
      active = false;
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
    };
  }, [activeCategory, tableNumber]);

  // Validasi meja cukup saat meja berubah (bukan tiap polling)
  useEffect(() => {
    let mounted = true;
    async function checkTable() {
      if (!tableNumber) return;
      try {
        await validateTable(tableNumber);
      } catch (err) {
        if (!mounted) return;
        setError(err.message);
      }
    }
    checkTable();
    return () => {
      mounted = false;
    };
  }, [tableNumber]);

  const handleCategoryChange = (categoryId) => {
    handleMenuInteraction();
    setActiveCategory(categoryId);
  };

  return (
    <div className="app-container">
      <Navbar tableNumber={tableNumber} onOpenScanner={() => setShowScanner(true)} />

      <div className="page-content">
        {/* Hero Section */}
        <div className="hero-section" id="hero-section">
          <p className="hero-greeting">Selamat datang di</p>
          <h1 className="hero-title">
            QuickOrder <span>Resto</span>
          </h1>
          <p className="hero-subtitle">
            Pilih menu favoritmu dan pesan langsung dari meja. Tanpa antri! ✨
          </p>
        </div>

        {/* QR Warning Banner */}
        {!tableNumber && (
          <div className="qr-warning-banner" id="qr-warning-banner">
            <span className="warning-icon">⚠️</span>
            <div>
              <h3>Perlu Scan QR Code</h3>
              <p>Menu dapat dilihat, tetapi Anda perlu memindai QR Code di meja Anda untuk melakukan pemesanan.</p>
              <button
                className="btn-scanner-trigger"
                onClick={() => setShowScanner(true)}
                style={{ marginTop: '12px' }}
              >
                📷 Hubungkan Kamera & Scan
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error ? (
          <div className="db-error-alert" id="db-error-alert">
            <span className="error-icon">⚠️</span>
            <div>
              <h3>Koneksi Database Gagal</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <TabMenu
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Menu Section */}
            <h2 className="section-title" id="menu-section-title">
              {activeCategory === 0
                ? '🍴 Semua Menu'
                : `${categories.find(c => c.id === activeCategory)?.name || 'Menu'}`
              }
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 400, fontSize: '0.8rem', marginLeft: '8px' }}>
                ({menuItems.length} item)
              </span>
            </h2>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
                <div className="spinner" style={{ borderTopColor: 'var(--color-accent)' }}></div>
              </div>
            ) : (
              <div className="menu-grid" id="menu-grid">
                {menuItems.map((item) => (
                  <MenuCard key={item.id} item={item} onInteract={handleMenuInteraction} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Cart Bar */}
      {totalItems > 0 && (
        <button
          className="floating-cart"
          id="floating-cart-bar"
          onClick={() => navigate(`/cart?meja=${tableNumber}`)}
        >
          <div className="floating-cart-left">
            <span className="floating-cart-count">{totalItems}</span>
            <span className="floating-cart-text">Lihat Keranjang</span>
          </div>
          <span className="floating-cart-total">{formatPrice(totalPrice)}</span>
        </button>
      )}

      {/* QR Camera Scanner Overlay */}
      {showScanner && (
        <CameraScanner
          onClose={() => setShowScanner(false)}
          onScanSuccess={handleScanSuccess}
        />
      )}
    </div>
  );
}

export default Home;
