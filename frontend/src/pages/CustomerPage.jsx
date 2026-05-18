import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';

const CustomerPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [tableNumber, setTableNumber] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState(null);
  const [activeView, setActiveView] = useState('menu');
  const [historyOrders, setHistoryOrders] = useState([]);

  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) {
      setTableNumber(table);
    }

    loadHistory();

    fetch(`http://${window.location.hostname}:3005/api/menu`)
      .then(res => res.json())
      .then(data => {
        setMenus(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('quickorder_history') || '[]');
    setHistoryOrders(saved);
  };

  const saveHistory = (orders) => {
    localStorage.setItem('quickorder_history', JSON.stringify(orders));
    setHistoryOrders(orders);
  };

  const syncHistoryStatus = async () => {
    if (historyOrders.length === 0) return;
    try {
      const res = await fetch(`http://${window.location.hostname}:3005/api/orders`);
      const data = await res.json();
      const statusMap = Object.fromEntries(data.map(order => [order.id, order.status]));
      const updated = historyOrders.map(order => ({
        ...order,
        status: statusMap[order.id] || order.status
      }));
      saveHistory(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenHistory = () => {
    setActiveView('history');
    syncHistoryStatus();
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleAddToCart = (menu) => {
    addToCart({ id: menu.id, name: menu.name, price: menu.price });
    setCheckoutState(null);
  };

  const handleCheckout = async () => {
    if (!tableNumber) {
      setCheckoutState({ error: true, message: 'Silakan gunakan parameter ?table= pada URL untuk memilih nomor meja sebelum checkout.' });
      return;
    }
    if (cart.length === 0) {
      setCheckoutState({ error: true, message: 'Keranjang masih kosong.' });
      return;
    }

    setCheckoutState({ loading: true, message: 'Mengirim pesanan...' });

    try {
      const total = cart.reduce((sum, item) => sum + item.qty * parseFloat(item.price || 0), 0);
      const response = await fetch(`http://${window.location.hostname}:3005/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableNo: tableNumber,
          customerName: `Tamu Meja ${tableNumber}`,
          total,
          items: cart.map(item => ({ id: item.id, qty: item.qty, name: item.name, price: item.price }))
        })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengirim pesanan.');
      }

      const newOrder = {
        id: result.order.id,
        tableNo: tableNumber,
        total,
        items: cart.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      saveHistory([newOrder, ...historyOrders]);
      clearCart();
      setCheckoutState({ error: false, message: 'Pesanan berhasil dikirim! Silakan tunggu di meja.' });
    } catch (err) {
      console.error(err);
      setCheckoutState({ error: true, message: err.message || 'Terjadi kesalahan saat checkout.' });
    }
  };

  return (
    <div style={styles.container}>
      {/* Modern Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>🍽️ QuickOrder</div>
        <div style={styles.navLinks}>
          <button type="button" style={styles.navLinkBtn} onClick={() => setActiveView('menu')}>Home</button>
          <button type="button" style={styles.navLinkBtn} onClick={() => setActiveView('menu')}>Menu</button>
          <button type="button" style={styles.navLinkBtn} onClick={handleOpenHistory}>History</button>
          <button style={styles.cartButton} onClick={() => setCartOpen(true)}>
            Keranjang ({totalItems})
          </button>
          <a href="/admin/login" style={styles.navLinkAdmin}>Admin Panel</a>
        </div>
      </nav>

      {/* Minimal Hero (visual only) */}
      <header style={styles.hero} aria-hidden>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Pesan makanan lebih cepat langsung dari meja</h1>
          <p style={styles.heroSubtitle}>Scan QR, pilih menu, kelola keranjang, dan pesan langsung ke dapur.</p>
        </div>
      </header>

      <main id="menu" style={styles.main}>
        {tableNumber && (
          <div style={styles.tableBanner}>
            <span style={styles.tableLabel}>Meja</span>
            <span style={styles.tableNumber}>{tableNumber}</span>
          </div>
        )}

        {activeView === 'history' ? (
          <>
            <h2 style={styles.sectionTitle}>Riwayat Pesanan</h2>
            <div style={styles.historyCard}>
              {historyOrders.length === 0 ? (
                <p style={styles.loadingText}>Belum ada riwayat pesanan.</p>
              ) : (
                <div style={styles.historyTableWrapper}>
                  <table style={styles.historyTable}>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Meja</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Waktu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyOrders.map(order => (
                        <tr key={order.id} style={styles.historyRow}>
                          <td>{order.id}</td>
                          <td>{order.tableNo}</td>
                          <td>
                            <div style={styles.historyItems}>
                              {order.items.map(item => (
                                <div key={`${order.id}-${item.id}`} style={styles.historyItem}>
                                  <span>{item.qty} x {item.name}</span>
                                  <span>Rp {Number(item.price).toLocaleString('id-ID')}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td>Rp {Number(order.total).toLocaleString('id-ID')}</td>
                          <td>{order.status}</td>
                          <td>{new Date(order.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 style={styles.sectionTitle}>Our Menu</h2>
            {loading ? (
              <p style={styles.loadingText}>Memuat menu...</p>
            ) : (
              <>
                <div style={styles.tabsContainer} role="tablist" aria-label="Kategori menu">
                  {['Semua', ...Array.from(new Set(menus.map(m => m.category_name).filter(Boolean)))].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={selectedCategory === cat}
                      style={selectedCategory === cat ? {...styles.tabButton, ...styles.tabActive} : styles.tabButton}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div style={styles.menuGrid}>
                  {menus.length > 0 ? menus
                    .filter(menu => selectedCategory === 'Semua' || menu.category_name === selectedCategory)
                    .map(menu => (
                      <div key={menu.id} style={styles.menuCard}>
                        {menu.image_url && <img src={menu.image_url} alt={menu.name} style={styles.menuImage} />}
                        <div style={styles.cardHeader}>
                          <span style={styles.categoryBadge}>{menu.category_name}</span>
                          <span style={styles.priceTag}>Rp {Number(menu.price).toLocaleString('id-ID')}</span>
                        </div>
                        <h3 style={styles.menuName}>{menu.name}</h3>
                        <p style={styles.menuDesc}>{menu.description || 'A delicious choice for your table.'}</p>
                        <button style={styles.orderBtn} onClick={() => handleAddToCart(menu)}>
                          Tambah ke Keranjang
                        </button>
                      </div>
                    )) : (
                      <p style={styles.loadingText}>Menu kosong. Silakan cek lagi nanti.</p>
                    )}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <footer style={styles.footer}>
        <p>© 2026 Quick Order Restaurant. All Rights Reserved.</p>
      </footer>

      {cartOpen && (
        <CartDrawer
          cartItems={cart}
          tableNumber={tableNumber}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onCheckout={handleCheckout}
          checkoutState={checkoutState}
        />
      )}
    </div>
  );
};

const styles = {
  container: { fontFamily: "'Inter', sans-serif", backgroundColor: '#f9fafb', minHeight: '100vh', margin: 0 },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' },
  brand: { fontSize: '1.5rem', fontWeight: 'bold', color: '#ff5722' },
  navLinks: { display: 'flex', gap: '1rem', alignItems: 'center' },
  navLink: { textDecoration: 'none', color: '#374151', fontWeight: '500', transition: 'color 0.2s' },
  navLinkBtn: { border: 'none', background: 'transparent', color: '#374151', fontWeight: 500, cursor: 'pointer' },
  navLinkAdmin: { textDecoration: 'none', color: '#ffffff', backgroundColor: '#374151', padding: '0.55rem 1rem', borderRadius: '999px', fontWeight: '500', fontSize: '0.9rem' },
  cartButton: { border: '1px solid #0f766e', backgroundColor: '#0f766e', color: '#ffffff', padding: '0.55rem 1rem', borderRadius: '999px', fontWeight: 600, cursor: 'pointer' },
  hero: { minHeight: '220px', backgroundColor: '#ffffff', borderBottom: '1px solid #e6eef6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', textAlign: 'center', position: 'relative' },
  heroOverlay: { padding: '2rem', zIndex: 1 },
  heroTitle: { fontSize: '2.8rem', margin: '0 0 0.75rem 0', fontWeight: '800', color: '#0f172a' },
  heroSubtitle: { fontSize: '1rem', margin: 0, color: '#475569', maxWidth: '720px' },
  main: { padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { fontSize: '2.5rem', textAlign: 'center', color: '#1f2937', marginBottom: '3rem' },
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' },
  menuCard: { backgroundColor: 'white', borderRadius: '20px', padding: '1.6rem', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)', transition: 'transform 0.25s', display: 'flex', flexDirection: 'column' },
  tableBanner: { display: 'inline-flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem', padding: '1rem 1.4rem', borderRadius: '24px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' },
  tableLabel: { fontSize: '0.95rem', color: '#2563eb', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 },
  tableNumber: { fontSize: '2.2rem', color: '#1e3a8a', fontWeight: 800 },
  tabsContainer: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', padding: '0 0.25rem' },
  tabButton: { padding: '0.67rem 1rem', borderRadius: '999px', border: '1px solid rgba(15,23,42,0.08)', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#334155', boxShadow: '0 3px 10px rgba(15,23,42,0.05)' },
  tabActive: { backgroundColor: '#0ea5e9', color: 'white', border: 'none', boxShadow: '0 8px 20px rgba(14,165,233,0.15)' },
  menuImage: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' },
  historyCard: { backgroundColor: '#ffffff', borderRadius: '24px', padding: '2rem', boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)', border: '1px solid #e2e8f0' },
  historyTableWrapper: { overflowX: 'auto' },
  historyTable: { width: '100%', borderCollapse: 'collapse', minWidth: '760px' },
  historyRow: { borderBottom: '1px solid #e2e8f0' },
  historyItems: { display: 'grid', gap: '0.5rem' },
  historyItem: { display: 'flex', justifyContent: 'space-between', color: '#334155', fontSize: '0.95rem' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  categoryBadge: { backgroundColor: '#fef3c7', color: '#b45309', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' },
  priceTag: { fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' },
  menuName: { fontSize: '1.45rem', margin: '0 0 0.5rem 0', color: '#111827' },
  menuDesc: { color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 },
  orderBtn: { width: '100%', padding: '0.85rem', backgroundColor: '#ec4899', color: 'white', border: 'none', borderRadius: '14px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', transition: 'background-color 0.2s' },
  loadingText: { textAlign: 'center', fontSize: '1.2rem', color: '#64748b', gridColumn: '1 / -1' },
  footer: { textAlign: 'center', padding: '2rem', backgroundColor: '#0f172a', color: '#94a3b8' }
};

export default CustomerPage;
