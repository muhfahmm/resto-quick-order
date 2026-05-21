import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardKasir() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const pollInterval = useRef(null);

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{"name":"Kasir"}');

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

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="dashboard-brand">
          <span className="brand-icon">🔑</span>
          <span className="brand-text">QuickOrder Resto</span>
          <span className="brand-tag">KASIR PANEL</span>
        </div>
        <div className="nav-actions">
          <div className="user-info">
            Petugas: <strong>{adminUser.name}</strong>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Keluar</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        
        {/* Stats Grid */}
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

        {/* Content Header */}
        <div className="content-header">
          <h2 className="content-title">Daftar Antrean Pesanan</h2>
          <button 
            className="refresh-btn" 
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
          >
            {refreshing ? 'Memuat...' : '🔄 Perbarui'}
          </button>
        </div>

        {error && <div className="auth-error" style={{ maxWidth: '100%' }}>{error}</div>}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <div className="spinner" style={{ borderTopColor: 'var(--color-primary)' }}></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3 className="empty-title">Belum Ada Pesanan Masuk</h3>
            <p className="empty-desc">Menunggu pesanan dari pelanggan lewat meja restoran...</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
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
                        <span>x{item.quantity} Menu ID {item.menu_item_id}</span>
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardKasir;
