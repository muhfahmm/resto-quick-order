import { useState, useEffect } from 'react';
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

  // Fetch categories & menu items
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        // 1. Validasi nomor meja di database jika ada
        if (tableNumber) {
          await validateTable(tableNumber);
        }

        // 2. Ambil data kategori dan menu
        const cats = await getCategories();
        setCategories(cats);

        const items = await getMenuItems(activeCategory === 0 ? null : activeCategory);
        setMenuItems(items);
      } catch (err) {
        console.error('Gagal memuat data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeCategory, tableNumber]);

  const handleCategoryChange = (categoryId) => {
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
                  <MenuCard key={item.id} item={item} />
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
