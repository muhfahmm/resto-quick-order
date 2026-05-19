import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';
import PaymentConfirmationModal from '../modals/PaymentConfirmationModal';

const CustomerPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [tableNumber, setTableNumber] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState(null);
  const [activeView, setActiveView] = useState('menu');
  const [historyOrders, setHistoryOrders] = useState([]);

  // Modal and Animation States
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [flyingParticles, setFlyingParticles] = useState([]);
  const [cartBouncing, setCartBouncing] = useState(false);

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

  const getProductQty = (menuId) => {
    const item = cart.find(i => i.id === menuId);
    return item ? item.qty : 0;
  };

  const triggerAddAnimation = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const newParticle = { id: Date.now() + Math.random(), x, y };
    setFlyingParticles(prev => [...prev, newParticle]);

    // Delay the bounce so it pops exactly when the particle merges
    setTimeout(() => {
      setCartBouncing(true);
    }, 550);

    setTimeout(() => {
      setCartBouncing(false);
    }, 850);

    // Clean up particle
    setTimeout(() => {
      setFlyingParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 800);
  };

  const handleAddToCartWithAnim = (e, menu) => {
    triggerAddAnimation(e);
    addToCart({ id: menu.id, name: menu.name, price: menu.price, image_url: menu.image_url });
    setCheckoutState(null);
  };

  const triggerPaymentModal = () => {
    if (!tableNumber) {
      setCheckoutState({ error: true, message: 'Silakan gunakan parameter ?table= pada URL untuk memilih nomor meja sebelum checkout.' });
      return;
    }
    if (cart.length === 0) {
      setCheckoutState({ error: true, message: 'Keranjang masih kosong.' });
      return;
    }
    setCartOpen(false); // Close the slide drawer
    setPaymentModalOpen(true); // Show the payment confirmation modal
  };

  const handleCheckout = async (paymentMethod) => {
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
          paymentMethod,
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
        items: cart.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price, image_url: item.image_url })),
        status: 'pending',
        paymentMethod,
        createdAt: new Date().toISOString()
      };
      saveHistory([newOrder, ...historyOrders]);
      clearCart();
      setPaymentModalOpen(false);
      setCheckoutState({ error: false, message: 'Pesanan berhasil dikirim! Silakan tunggu di meja.' });
    } catch (err) {
      console.error(err);
      setCheckoutState({ error: true, message: err.message || 'Terjadi kesalahan saat checkout.' });
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Style Block */}
      <style>{`
        .app-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #f8fafc;
          min-height: 100vh;
          margin: 0;
          color: #1e293b;
          display: flex;
          flex-direction: column;
        }

        /* Modern Navbar Styling */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.95rem 6%;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
          border-bottom: 1px solid rgba(15, 23, 42, 0.05);
        }

        .brand {
          font-size: 1.45rem;
          font-weight: 800;
          color: #ff5722;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 6px;
          user-select: none;
        }

        .nav-desktop-links {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .nav-link-btn {
          border: none;
          background: transparent;
          color: #475569;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 8px 16px;
          border-radius: 999px;
        }

        .nav-link-btn:hover {
          color: #ff5722;
          background-color: #fff3f0;
        }

        .nav-link-btn.active {
          color: #ff5722;
          background-color: #fff3f0;
        }

        /* Modern Cart Icon Button */
        .cart-button {
          border: none;
          background-color: #0f766e;
          color: #ffffff;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(15, 118, 110, 0.2);
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .cart-button:hover {
          background-color: #0d655d;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(15, 118, 110, 0.3);
        }

        .cart-button svg {
          width: 22px;
          height: 22px;
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: #ef4444;
          color: white;
          font-size: 0.72rem;
          font-weight: 800;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.35);
          border: 2px solid #ffffff;
          animation: badgePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Cart bump bounce micro-animation */
        .cart-bounce {
          animation: cartBump 0.3s ease-out;
        }

        @keyframes cartBump {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        @keyframes badgePop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        /* Flying particle */
        .flying-particle {
          position: fixed;
          width: 24px;
          height: 24px;
          background-color: #ec4899;
          border-radius: 50%;
          z-index: 9999;
          pointer-events: none;
          box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
          animation: flyToCart 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes flyToCart {
          0% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
          40% {
            transform: translate(-50%, -50%) scale(1.4);
          }
          100% {
            left: calc(100vw - 60px);
            top: 25px;
            transform: translate(0, 0) scale(0.3);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          @keyframes flyToCart {
            0% {
              transform: translate(-50%, -50%) scale(1.1);
              opacity: 1;
            }
            100% {
              left: calc(100vw - 45px);
              top: 25px;
              transform: translate(0, 0) scale(0.3);
              opacity: 0;
            }
          }
        }

        /* Mobile Top Navbar Tweaks */
        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none !important;
          }
          .navbar {
            padding: 0.8rem 5% !important;
          }
          .brand {
            font-size: 1.2rem !important;
          }
        }

        /* Premium Mobile Bottom Floating Navigation Bar */
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 340px;
          background-color: rgba(15, 23, 42, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 6px 10px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
          z-index: 999;
          justify-content: space-around;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          gap: 3px;
          transition: all 0.2s ease;
          padding: 8px 24px;
          border-radius: 20px;
        }

        .mobile-nav-item.active {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.12);
        }

        /* Compact Spacesaving Menu Card grid */
        .menu-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 24px !important;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }

        /* Compact Spacesaving Menu Card */
        .menu-card {
          background-color: white;
          border-radius: 20px;
          padding: 12px !important;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.04);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .menu-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
        }

        .menu-image {
          width: 100%;
          height: 140px !important;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 8px !important;
        }

        @media (max-width: 768px) {
          .menu-image {
            height: 100px !important;
          }
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px !important;
          gap: 4px;
        }

        .category-badge {
          background-color: #fff3f0;
          color: #ff5722;
          padding: 2px 8px !important;
          border-radius: 6px !important;
          font-size: 0.68rem !important;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .price-tag {
          font-size: 0.95rem !important;
          font-weight: 800;
          color: #10b981;
        }

        .menu-name {
          font-size: 1rem !important;
          font-weight: 700;
          margin: 0 0 4px 0 !important;
          color: #0f172a;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-desc {
          color: #64748b;
          font-size: 0.78rem !important;
          margin-bottom: 10px !important;
          flex-grow: 1;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .order-btn {
          width: 100%;
          padding: 0.6rem !important;
          background-color: #ec4899;
          color: white;
          border: none;
          border-radius: 10px !important;
          font-size: 0.82rem !important;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.15);
        }

        .order-btn:hover {
          background-color: #db2777;
          box-shadow: 0 6px 14px rgba(236, 72, 153, 0.25);
        }

        /* Tactile Quantity Selector Buttons */
        .qty-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: auto;
          gap: 6px;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: none;
          user-select: none;
        }

        .qty-btn:active {
          transform: scale(0.85);
        }

        .qty-btn-minus {
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
        }

        .qty-btn-minus:hover {
          background-color: #e2e8f0;
          color: #0f172a;
        }

        .qty-btn-plus {
          background-color: #ec4899;
          color: white;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.2);
        }

        .qty-btn-plus:hover {
          background-color: #db2777;
          box-shadow: 0 6px 14px rgba(236, 72, 153, 0.3);
        }

        .qty-text {
          font-weight: 800;
          font-size: 1.05rem;
          color: #0f172a;
          user-select: none;
        }

        /* Hero details optimization */
        .hero {
          min-height: 170px !important;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1e293b;
          text-align: center;
          padding: 1.5rem !important;
        }

        .hero-title {
          font-size: 2.2rem !important;
          margin: 0 0 0.5rem 0 !important;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
        }

        .hero-subtitle {
          font-size: 0.92rem !important;
          color: #475569;
          max-width: 600px;
          margin: 0 auto !important;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 130px !important;
            padding: 1rem !important;
          }
          .hero-title {
            font-size: 1.45rem !important;
          }
          .hero-subtitle {
            font-size: 0.78rem !important;
          }
        }

        .main-section {
          padding: 3rem 6%;
          max-width: 1200px;
          margin: 0 auto;
          flex-grow: 1;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .main-section {
            padding: 1.5rem 4% 7rem 4% !important;
          }
        }

        .section-title {
          font-size: 2rem !important;
          text-align: center;
          color: #1f2937;
          margin-bottom: 2rem !important;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.45rem !important;
            margin-bottom: 1.2rem !important;
          }
        }

        /* Banner Table */
        .table-banner {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 0.5rem 1rem !important;
          border-radius: 999px !important;
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
        }

        .table-label {
          font-size: 0.8rem !important;
          color: #2563eb;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .table-number {
          font-size: 1.25rem !important;
          color: #1e3a8a;
          font-weight: 900;
        }

        .tabs-container {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .tabs-container::-webkit-scrollbar {
          display: none;
        }

        .tab-button {
          padding: 6px 14px !important;
          border-radius: 999px !important;
          border: 1px solid rgba(15, 23, 42, 0.06) !important;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem !important;
          color: #475569;
          box-shadow: 0 2px 6px rgba(15,23,42,0.02);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .tab-active {
          background-color: #0ea5e9 !important;
          color: white !important;
          border-color: #0ea5e9 !important;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2) !important;
        }

        /* History view styling */
        .history-card {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 1.5rem !important;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem !important;
        }

        .history-table th {
          font-weight: 700;
          color: #475569;
          border-bottom: 2px solid #f1f5f9;
          padding: 10px !important;
        }

        .history-table td {
          padding: 12px 10px !important;
          border-bottom: 1px solid #f1f5f9;
        }

        .footer {
          text-align: center;
          padding: 1.5rem !important;
          background-color: #0f172a;
          color: #94a3b8;
          font-size: 0.82rem !important;
        }
      `}</style>

      {/* Modern Navbar */}
      <nav className="navbar">
        <div className="brand">🍽️ QuickOrder</div>
        <div className="nav-desktop-links">
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveView('menu')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveView('menu')}
          >
            Menu
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'history' ? 'active' : ''}`}
            onClick={handleOpenHistory}
          >
            History
          </button>
        </div>
        <div className="nav-right">
          <button className={`cart-button ${cartBouncing ? 'cart-bounce' : ''}`} onClick={() => setCartOpen(true)}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </nav>

      {/* Minimal Hero (visual only) */}
      <header className="hero" aria-hidden>
        <div style={{ zIndex: 1 }}>
          <h1 className="hero-title">Pesan makanan lebih cepat langsung dari meja</h1>
          <p className="hero-subtitle">Scan QR, pilih menu, kelola keranjang, dan pesan langsung ke dapur.</p>
        </div>
      </header>

      <main id="menu" className="main-section">
        {tableNumber && (
          <div className="table-banner">
            <span className="table-label">Meja</span>
            <span className="table-number">{tableNumber}</span>
          </div>
        )}

        {activeView === 'history' ? (
          <>
            <h2 className="section-title">Riwayat Pesanan</h2>
            <div className="history-card">
              {historyOrders.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b' }}>Belum ada riwayat pesanan.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="history-table">
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
                        <tr key={order.id}>
                          <td style={{ fontWeight: 600 }}>{order.id}</td>
                          <td>{order.tableNo}</td>
                          <td>
                            <div style={{ display: 'grid', gap: '4px' }}>
                              {order.items.map(item => (
                                <div key={`${order.id}-${item.id}`} style={{ display: 'flex', justifycontent: 'space-between', color: '#475569', gap: '12px' }}>
                                  <span>{item.qty} x {item.name}</span>
                                  <span>Rp {Number(item.price).toLocaleString('id-ID')}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td style={{ fontWeight: 700, color: '#0f766e' }}>Rp {Number(order.total).toLocaleString('id-ID')}</td>
                          <td>
                            <span style={{
                              display: 'inline-flex',
                              padding: '2px 8px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              backgroundColor: order.status === 'pending' ? '#fef3c7' : order.status === 'confirmed' ? '#e0f2fe' : order.status === 'ready' ? '#dcfce7' : '#f1f5f9',
                              color: order.status === 'pending' ? '#b45309' : order.status === 'confirmed' ? '#0369a1' : order.status === 'ready' ? '#15803d' : '#475569'
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ color: '#64748b', fontSize: '0.8rem' }}>{new Date(order.createdAt).toLocaleString()}</td>
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
            <h2 className="section-title">Our Menu</h2>
            {loading ? (
              <p style={{ textAlign: 'center', color: '#64748b' }}>Memuat menu...</p>
            ) : (
              <>
                <div className="tabs-container" role="tablist" aria-label="Kategori menu">
                  {['Semua', ...Array.from(new Set(menus.map(m => m.category_name).filter(Boolean)))].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={selectedCategory === cat}
                      className={`tab-button ${selectedCategory === cat ? 'tab-active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="menu-grid">
                  {menus.length > 0 ? menus
                    .filter(menu => selectedCategory === 'Semua' || menu.category_name === selectedCategory)
                    .map(menu => {
                      const qty = getProductQty(menu.id);
                      return (
                        <div key={menu.id} className="menu-card">
                          {menu.image_url && <img src={menu.image_url} alt={menu.name} className="menu-image" />}
                          <div className="card-header">
                            <span className="price-tag">Rp {Number(menu.price).toLocaleString('id-ID')}</span>
                          </div>
                          <h3 className="menu-name" title={menu.name}>{menu.name}</h3>
                          
                          {/* Tactile spacesaving buttons */}
                          {qty === 0 ? (
                            <button className="order-btn" onClick={(e) => handleAddToCartWithAnim(e, menu)}>
                              Tambah ke Keranjang
                            </button>
                          ) : (
                            <div className="qty-selector">
                              <button 
                                onClick={() => decreaseQty(menu.id)} 
                                className="qty-btn qty-btn-minus"
                              >
                                -
                              </button>
                              <span className="qty-text">{qty}</span>
                              <button 
                                onClick={() => increaseQty(menu.id)} 
                                className="qty-btn qty-btn-plus"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    }) : (
                      <p style={{ textAlign: 'center', color: '#64748b', gridColumn: '1 / -1' }}>Menu kosong. Silakan cek lagi nanti.</p>
                    )}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Quick Order Restaurant. All Rights Reserved.</p>
      </footer>

      {/* Premium Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        <button
          onClick={() => setActiveView('menu')}
          className={`mobile-nav-item ${activeView === 'menu' ? 'active' : ''}`}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Menu</span>
        </button>
        <button
          onClick={handleOpenHistory}
          className={`mobile-nav-item ${activeView === 'history' ? 'active' : ''}`}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span>History</span>
        </button>
      </div>

      {/* Dynamic Flying Particles Container */}
      {flyingParticles.map(p => (
        <div 
          key={p.id} 
          className="flying-particle" 
          style={{ left: p.x, top: p.y }}
        />
      ))}

      {/* CartDrawer rendered unconditionally for slide transitions */}
      <CartDrawer
        isOpen={cartOpen}
        cartItems={cart}
        tableNumber={tableNumber}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onCheckout={triggerPaymentModal}
        checkoutState={checkoutState}
      />

      {/* Pre-checkout Payment Confirmation Modal */}
      <PaymentConfirmationModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        cartItems={cart}
        total={cart.reduce((sum, item) => sum + item.qty * parseFloat(item.price || 0), 0)}
        tableNumber={tableNumber}
        onConfirm={handleCheckout}
        loading={checkoutState?.loading}
      />
    </div>
  );
};

export default CustomerPage;
