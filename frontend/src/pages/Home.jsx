import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TabMenu from '../components/TabMenu';
import MenuCard from '../components/MenuCard';
import { useCart } from '../context/CartContext';
import { getCategories, getMenuItems, formatPrice, validateTable } from '../services/api';

function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tableNumber = searchParams.get('meja') || '1';

  useEffect(() => {
    console.log(`%c[USER ACCESS] Mengakses Halaman Menu Utama - Meja: ${tableNumber}`, 'color: #4caf50; font-weight: bold; font-size: 12px;');
  }, [tableNumber]);


  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { totalItems, totalPrice } = useCart();

  // Fetch categories & menu items
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        // 1. Validasi nomor meja di database
        await validateTable(tableNumber);

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
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="app-container">
      <Navbar tableNumber={tableNumber} />

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
    </div>
  );
}

export default Home;
