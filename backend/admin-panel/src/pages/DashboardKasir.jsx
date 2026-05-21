import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardKasir() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('antrean'); // 'antrean', 'riwayat', 'statistik'
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all', 'completed', 'cancelled'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pollInterval = useRef(null);

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{"username":"Kasir"}');

  // Fetch orders
  const fetchOrders = async (showIndicator = false) => {
    if (showIndicator) setRefreshing(true);
    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Sort newest first
        setOrders(data.data.sort((a, b) => b.order_time.localeCompare(a.order_time)));
        setError('');
      } else {
        setError(data.message || 'Gagal memuat pesanan');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Gagal terhubung ke API backend (port 3001).');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    console.log('%c[ADMIN ACCESS] Mengakses Halaman Dashboard Kasir', 'color: #00bcd4; font-weight: bold; font-size: 12px;');
    fetchOrders();

    // Start auto polling every 5 seconds to show orders in real-time
    pollInterval.current = setInterval(() => {
      fetchOrders(false);
    }, 5000);

    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, []);

  // Update order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Update local state directly for responsive feedback
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      } else {
        alert(data.message || 'Gagal mengubah status pesanan');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Terjadi kesalahan koneksi ke server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  // Format IDR Price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format Date ISO to local readable time
  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
    } catch (e) {
      return '-';
    }
  };

  // Stats calculation
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const processingCount = orders.filter(o => o.status === 'processing' || o.status === 'diproses').length;
  const completedCount = orders.filter(o => o.status === 'completed' || o.status === 'selesai').length;
  const totalIncome = orders
    .filter(o => o.status === 'completed' || o.status === 'selesai')
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);

  const activeOrdersCount = pendingCount + processingCount;

  // Filter history orders (completed and cancelled)
  const historyOrders = orders.filter(o => {
    if (o.status === 'pending' || o.status === 'processing' || o.status === 'diproses') {
      return false;
    }
    if (historyFilter === 'completed') {
      return o.status === 'completed' || o.status === 'selesai';
    }
    if (historyFilter === 'cancelled') {
      return o.status === 'cancelled';
    }
    return true; // 'all'
  });

  // Calculate top menu items based on completed orders
  const getTopMenuItems = () => {
    const itemCounts = {};
    orders
      .filter(o => o.status === 'completed' || o.status === 'selesai')
      .forEach(o => {
        if (o.items) {
          o.items.forEach(item => {
            const name = item.name || `Menu ID ${item.menu_item_id}`;
            itemCounts[name] = (itemCounts[name] || 0) + item.quantity;
          });
        }
      });
    return Object.entries(itemCounts)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5); // top 5
  };
  const topItems = getTopMenuItems();
  const maxQty = topItems.length > 0 ? Math.max(...topItems.map(item => item.qty)) : 1;

  // Helper to render order card
  const renderOrderCard = (order) => (
    <div key={order.id} className="order-card" id={`order-card-${order.id}`}>
      <div className="order-card-header">
        <span className="order-meja">📍 Meja {order.table_number}</span>
        <span className="order-time">{formatTime(order.order_time)}</span>
      </div>
      
      <div className="order-body">
        <div className="order-meta-row">
          <span>ID: #{order.id}</span>
          <span className={`status-badge ${order.status}`}>
            {order.status === 'processing' ? 'diproses' : order.status}
          </span>
        </div>

        <div className="order-items-list">
          {order.items && order.items.map((item, idx) => (
            <div key={idx} className="order-item-row">
              <span>x{item.quantity} {item.name || `Menu ID ${item.menu_item_id}`}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          {(!order.items || order.items.length === 0) && (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Tidak ada detail item</p>
          )}
        </div>

        <div className="order-total-row">
          <span>Total Pembayaran</span>
          <span className="amount">{formatPrice(order.total_amount)}</span>
        </div>
      </div>

      <div className="order-actions">
        {(order.status === 'pending') && (
          <>
            <button 
              className="btn-action process"
              onClick={() => handleUpdateStatus(order.id, 'processing')}
            >
              🍳 Proses
            </button>
            <button 
              className="btn-action cancel"
              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
            >
              ❌ Tolak
            </button>
          </>
        )}
        {(order.status === 'processing' || order.status === 'diproses') && (
          <button 
            className="btn-action complete"
            onClick={() => handleUpdateStatus(order.id, 'completed')}
          >
            ✅ Selesaikan
          </button>
        )}
        {(order.status === 'completed' || order.status === 'selesai' || order.status === 'cancelled') && (
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 'auto', textAlign: 'center' }}>
            Tidak ada tindakan tersisa
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Mobile Top Header */}
      <header className="mobile-header">
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="mobile-brand">
          <span className="brand-text">QuickOrder</span>
          <span className="brand-tag">KASIR</span>
        </div>
        <div style={{ width: '36px' }}></div> {/* balancing layout spacing */}
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Left Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand-wrapper">
          <div className="sidebar-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px', color: 'var(--color-primary)' }}>
              <path d="M3 17h18" />
              <path d="M18 17a6 6 0 0 0-12 0" />
              <path d="M12 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            </svg>
            <div className="brand-titles">
              <span className="brand-title">QuickOrder</span>
              <span className="brand-subtitle">RESTO PANEL</span>
            </div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-menu">
          <button 
            className={`sidebar-menu-item ${activeTab === 'antrean' ? 'active' : ''}`}
            onClick={() => { setActiveTab('antrean'); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="menu-text">Antrean Aktif</span>
            {activeOrdersCount > 0 && (
              <span className="menu-badge">{activeOrdersCount}</span>
            )}
          </button>

          <button 
            className={`sidebar-menu-item ${activeTab === 'riwayat' ? 'active' : ''}`}
            onClick={() => { setActiveTab('riwayat'); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="15" y2="16" />
              <line x1="9" y1="8" x2="10" y2="8" />
            </svg>
            <span className="menu-text">Semua Riwayat</span>
          </button>

          <button 
            className={`sidebar-menu-item ${activeTab === 'statistik' ? 'active' : ''}`}
            onClick={() => { setActiveTab('statistik'); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span className="menu-text">Analisis & Omzet</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-profile">
            <div className="profile-avatar">
              {(adminUser.username || adminUser.name || 'K').substring(0, 2).toUpperCase()}
            </div>
            <div className="profile-info">
              <span className="profile-role">Petugas</span>
              <span className="profile-name">{adminUser.username || adminUser.name || 'Kasir'}</span>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Header of Main Area (only visible on Desktop) */}
        <header className="main-header">
          <div className="header-info">
            <h1 className="header-title">
              {activeTab === 'antrean' && 'Antrean Aktif'}
              {activeTab === 'riwayat' && 'Semua Riwayat Pesanan'}
              {activeTab === 'statistik' && 'Analisis & Omzet'}
            </h1>
            <p className="header-subtitle">
              {activeTab === 'antrean' && 'Kelola pesanan pelanggan yang sedang berjalan.'}
              {activeTab === 'riwayat' && 'Seluruh histori transaksi pelanggan yang tercatat.'}
              {activeTab === 'statistik' && 'Statistik performa penjualan dan total pendapatan.'}
            </p>
          </div>
          <div className="header-actions">
            <button 
              className="refresh-btn" 
              onClick={() => fetchOrders(true)}
              disabled={refreshing}
            >
              {refreshing ? 'Memuat...' : '🔄 Perbarui'}
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="dashboard-content">
          <h2 className="mobile-view-title">
            {activeTab === 'antrean' && 'Antrean Aktif'}
            {activeTab === 'riwayat' && 'Semua Riwayat Pesanan'}
            {activeTab === 'statistik' && 'Analisis & Omzet'}
          </h2>

          {error && <div className="auth-error" style={{ maxWidth: '100%' }}>{error}</div>}

          {/* Tab 1: Antrean Aktif */}
          {activeTab === 'antrean' && (
            <>
              {/* Active stats summary cards */}
              <div className="stats-grid" style={{ marginBottom: '24px' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--color-status-pending)' }}>
                  <div className="stat-info">
                    <h3>Belum Diproses</h3>
                    <p>{pendingCount}</p>
                  </div>
                  <span className="stat-icon">⏳</span>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--color-status-processing)' }}>
                  <div className="stat-info">
                    <h3>Sedang Dibuat</h3>
                    <p>{processingCount}</p>
                  </div>
                  <span className="stat-icon">🍳</span>
                </div>
              </div>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                  <div className="spinner" style={{ borderTopColor: 'var(--color-primary)' }}></div>
                </div>
              ) : orders.filter(o => o.status === 'pending' || o.status === 'processing' || o.status === 'diproses').length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <h3 className="empty-title">Belum Ada Antrean Aktif</h3>
                  <p className="empty-desc">Semua pesanan pelanggan telah diproses atau dibatalkan.</p>
                </div>
              ) : (
                <div className="orders-grid">
                  {orders
                    .filter(o => o.status === 'pending' || o.status === 'processing' || o.status === 'diproses')
                    .map(order => renderOrderCard(order))}
                </div>
              )}
            </>
          )}

          {/* Tab 2: Semua Riwayat */}
          {activeTab === 'riwayat' && (
            <>
              {/* History Sub Filters */}
              <div className="history-filters">
                <button 
                  className={`filter-pill ${historyFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setHistoryFilter('all')}
                >
                  Semua Riwayat ({orders.filter(o => o.status === 'completed' || o.status === 'selesai' || o.status === 'cancelled').length})
                </button>
                <button 
                  className={`filter-pill ${historyFilter === 'completed' ? 'active' : ''}`}
                  onClick={() => setHistoryFilter('completed')}
                >
                  Selesai ({completedCount})
                </button>
                <button 
                  className={`filter-pill ${historyFilter === 'cancelled' ? 'active' : ''}`}
                  onClick={() => setHistoryFilter('cancelled')}
                >
                  Dibatalkan ({orders.filter(o => o.status === 'cancelled').length})
                </button>
              </div>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                  <div className="spinner" style={{ borderTopColor: 'var(--color-primary)' }}></div>
                </div>
              ) : historyOrders.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <h3 className="empty-title">Tidak Ada Riwayat Pesanan</h3>
                  <p className="empty-desc">Belum ada transaksi dengan status pencarian ini.</p>
                </div>
              ) : (
                <div className="orders-grid">
                  {historyOrders.map(order => renderOrderCard(order))}
                </div>
              )}
            </>
          )}

          {/* Tab 3: Analisis & Omzet */}
          {activeTab === 'statistik' && (
            <>
              {/* Full stats grid */}
              <div className="stats-grid">
                <div className="stat-card" style={{ borderLeft: '4px solid var(--color-status-pending)' }}>
                  <div className="stat-info">
                    <h3>Belum Diproses</h3>
                    <p>{pendingCount}</p>
                  </div>
                  <span className="stat-icon">⏳</span>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--color-status-processing)' }}>
                  <div className="stat-info">
                    <h3>Sedang Dibuat</h3>
                    <p>{processingCount}</p>
                  </div>
                  <span className="stat-icon">🍳</span>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--color-status-completed)' }}>
                  <div className="stat-info">
                    <h3>Pesanan Selesai</h3>
                    <p>{completedCount}</p>
                  </div>
                  <span className="stat-icon">✅</span>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                  <div className="stat-info">
                    <h3>Omzet Selesai</h3>
                    <p style={{ fontSize: '1.4rem' }}>{formatPrice(totalIncome)}</p>
                  </div>
                  <span className="stat-icon">💰</span>
                </div>
              </div>

              <div className="analytics-grid">
                {/* Completion Rate Card */}
                <div className="analytics-card">
                  <h3 className="analytics-card-title">Persentase Penyelesaian</h3>
                  <div className="completed-rate-section">
                    <div 
                      className="completed-rate-circle" 
                      style={{ 
                        background: `radial-gradient(closest-side, var(--color-bg-card) 79%, transparent 80% 100%), conic-gradient(var(--color-status-completed) ${Math.round((completedCount / (orders.length || 1)) * 100)}%, rgba(255, 255, 255, 0.05) 0)`
                      }}
                    >
                      <span className="completed-rate-value">
                        {Math.round((completedCount / (orders.length || 1)) * 100)}%
                      </span>
                    </div>
                    <div className="rate-details">
                      <h4>Penyelesaian Pesanan</h4>
                      <p>{completedCount} dari {orders.length} Total Pesanan</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '500', marginTop: '6px' }}>
                        Nilai Rata-rata Pesanan: {formatPrice(totalIncome / (completedCount || 1))}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Best Selling Items Card */}
                <div className="analytics-card">
                  <h3 className="analytics-card-title">Menu Terlaris (Top 5)</h3>
                  <div className="top-items-list">
                    {topItems.length === 0 ? (
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
                        Belum ada menu yang terjual dari pesanan selesai.
                      </p>
                    ) : (
                      topItems.map((item, idx) => (
                        <div key={idx} className="top-item-row-analytic">
                          <div className="top-item-info">
                            <span>{item.name}</span>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>{item.qty} porsi</span>
                          </div>
                          <div className="top-item-bar-bg">
                            <div 
                              className="top-item-bar-fill" 
                              style={{ width: `${(item.qty / maxQty) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardKasir;
