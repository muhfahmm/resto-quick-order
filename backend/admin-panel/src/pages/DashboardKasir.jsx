import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Produk from './Produk';
import Kategori from './Kategori';
import Riwayat from '../sidebar-menu/Riwayat';
import Statistik from '../sidebar-menu/Statistik';
import QrCodes from '../sidebar-menu/QrCodes';
import ProdukTab from '../sidebar-menu/ProdukTab';
import KategoriTab from '../sidebar-menu/KategoriTab';
import { PinIcon, RefreshIcon, CogIcon } from '../components/TwIcons';

function DashboardKasir() {
  const navigate = useNavigate();
  const location = useLocation();
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const API_BASE_URL = `http://${hostname}:3001/api`;
  const CLIENT_BASE_URL = `http://${hostname}:5173`;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('riwayat'); // 'riwayat', 'statistik', 'qrcodes', 'produk', 'kategori'
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all', 'completed', 'cancelled'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pollInterval = useRef(null);

  // QR Code States
  const [qrcodes, setQrcodes] = useState([]);
  const [qrTableNumber, setQrTableNumber] = useState('');
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState('');
  const [qrSuccess, setQrSuccess] = useState('');

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{"username":"Kasir"}');

  // Fetch orders
  const fetchOrders = async (showIndicator = false) => {
    if (showIndicator) setRefreshing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
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
      setError('Gagal terhubung ke API backend (IP 192.168.100.3:3001).');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch QR codes
  const fetchQrcodes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/qrcodes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setQrcodes(data.data);
      }
    } catch (err) {
      console.error('Error fetching qrcodes:', err);
    }
  };

  useEffect(() => {
    console.log('%c[ADMIN ACCESS] Mengakses Halaman Dashboard Kasir', 'color: #00bcd4; font-weight: bold; font-size: 12px;');
    fetchOrders();
    fetchQrcodes();

    // Start auto polling every 5 seconds to show orders in real-time
    pollInterval.current = setInterval(() => {
      fetchOrders(false);
    }, 5000);

    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, []);

  // Sync activeTab with URL path (last segment)
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || 'riwayat';
    // only update if different
    if (last !== activeTab) setActiveTab(last);
  }, [location.pathname]);

  // Update order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
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

  // Register QR Code / Table
  const handleRegisterQrCode = async (e) => {
    e.preventDefault();
    if (!qrTableNumber) {
      setQrError('Harap isi nomor meja!');
      return;
    }
    
    setQrLoading(true);
    setQrError('');
    setQrSuccess('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/qrcodes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ table_number: qrTableNumber }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setQrSuccess(data.message);
        setQrTableNumber('');
        fetchQrcodes();
      } else {
        setQrError(data.message || 'Gagal mendaftarkan meja');
      }
    } catch (err) {
      console.error('Error creating qrcode:', err);
      setQrError('Gagal terhubung ke server backend.');
    } finally {
      setQrLoading(false);
    }
  };

  // Delete QR Code / Table
  const handleDeleteQrCode = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus meja ini? Pelanggan tidak akan bisa memesan dari meja ini lagi.')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/qrcodes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        fetchQrcodes();
      } else {
        alert(data.message || 'Gagal menghapus meja');
      }
    } catch (err) {
      console.error('Error deleting qrcode:', err);
      alert('Gagal terhubung ke server backend.');
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

  // Calculate top menu items based on completed orders
  const getTopMenuItems = () => {
    const itemCounts = {};
    orders
      .filter(o => o.status === 'completed' || o.status === 'selesai')
      .forEach(o => {
        if (o.items) {
          o.items.forEach(item => {
            const name = item.name || `Menu ID ${item.product_id || item.menu_item_id}`;
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
            className={`sidebar-menu-item ${activeTab === 'produk' ? 'active' : ''}`}
            onClick={() => { navigate('/dashboard/produk'); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <path d="M3 7h18" />
              <path d="M3 12h18" />
              <path d="M3 17h18" />
            </svg>
            <span className="menu-text">Produk</span>
          </button>

          <button
            className={`sidebar-menu-item ${activeTab === 'kategori' ? 'active' : ''}`}
            onClick={() => { navigate('/dashboard/kategori'); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a7 7 0 0 0 0-6" />
              <path d="M4.6 9a7 7 0 0 0 0 6" />
            </svg>
            <span className="menu-text">Kategori</span>
          </button>

          <button 
            className={`sidebar-menu-item ${activeTab === 'riwayat' ? 'active' : ''}`}
            onClick={() => { navigate('/dashboard/riwayat'); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="15" y2="16" />
              <line x1="9" y1="8" x2="10" y2="8" />
            </svg>
            <span className="menu-text">Pesanan</span>
            {activeOrdersCount > 0 && (
              <span className="menu-badge">{activeOrdersCount}</span>
            )}
          </button>

          <button 
            className={`sidebar-menu-item ${activeTab === 'statistik' ? 'active' : ''}`}
            onClick={() => { navigate('/dashboard/statistik'); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span className="menu-text">Analisis & Omzet</span>
          </button>

          <button 
            className={`sidebar-menu-item ${activeTab === 'qrcodes' ? 'active' : ''}`}
            onClick={() => { navigate('/dashboard/qrcodes'); setSidebarOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <rect x="7" y="7" width="3" height="3" />
              <rect x="14" y="7" width="3" height="3" />
              <rect x="7" y="14" width="3" height="3" />
              <line x1="14" y1="14" x2="14" y2="17" />
              <line x1="17" y1="14" x2="17" y2="17" />
            </svg>
            <span className="menu-text">Generate QR Meja</span>
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
              {activeTab === 'riwayat' && 'Semua Pesanan'}
              {activeTab === 'statistik' && 'Analisis & Omzet'}
              {activeTab === 'qrcodes' && 'Generate QR Code Meja'}
              {activeTab === 'produk' && 'Manajemen Produk'}
              {activeTab === 'kategori' && 'Manajemen Kategori'}
            </h1>
            <p className="header-subtitle">
              {activeTab === 'riwayat' && 'Kelola semua pesanan pelanggan — proses, tolak, atau selesaikan dari satu tempat.'}
              {activeTab === 'statistik' && 'Statistik performa penjualan dan total pendapatan.'}
              {activeTab === 'qrcodes' && 'Buat QR Code meja secara instan dan daftarkan ke database.'}
              {activeTab === 'produk' && 'Tambah, sunting, atau hapus produk yang tersedia di menu.'}
              {activeTab === 'kategori' && 'Kelola kategori menu: tambah, sunting, atau hapus.'}
            </p>
          </div>
          <div className="header-actions">
            <button className="refresh-btn" onClick={() => { fetchOrders(true); fetchQrcodes(); }} disabled={refreshing}>
              {refreshing ? 'Memuat...' : (<><RefreshIcon /> Perbarui</>)}
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="dashboard-content">
          <h2 className="mobile-view-title">
            {activeTab === 'riwayat' && 'Semua Pesanan'}
            {activeTab === 'statistik' && 'Analisis & Omzet'}
            {activeTab === 'qrcodes' && 'Generate QR Code Meja'}
            {activeTab === 'produk' && 'Manajemen Produk'}
            {activeTab === 'kategori' && 'Manajemen Kategori'}
          </h2>

          {error && <div className="auth-error" style={{ maxWidth: '100%' }}>{error}</div>}

          {activeTab === 'riwayat' && (
            <Riwayat orders={orders} loading={loading} historyFilter={historyFilter} setHistoryFilter={setHistoryFilter} onUpdateStatus={handleUpdateStatus} formatPrice={formatPrice} formatTime={formatTime} />
          )}

          {activeTab === 'statistik' && (
            <Statistik orders={orders} totalIncome={totalIncome} topItems={topItems} maxQty={maxQty} pendingCount={pendingCount} processingCount={processingCount} completedCount={completedCount} formatPrice={formatPrice} />
          )}

          {activeTab === 'qrcodes' && (
            <div className="qrcode-manager-layout">
              <div className="qrcode-generator-card">
                <h3 className="generator-title"><CogIcon /> Buat QR Code Meja Baru</h3>
                {qrError && <div className="auth-error" style={{ marginBottom: '16px' }}>{qrError}</div>}
                {qrSuccess && (<div className="auth-error" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#a7f3d0', marginBottom: '16px' }}>{qrSuccess}</div>)}
                <form onSubmit={handleRegisterQrCode} className="qr-form">
                  <div className="form-group">
                    <label className="form-label">Nomor Meja</label>
                    <input type="number" className="form-input" placeholder="Masukkan nomor meja (misal: 1, 2, dst)" value={qrTableNumber} onChange={(e) => { setQrTableNumber(e.target.value); setQrError(''); setQrSuccess(''); }} min="1" />
                  </div>
                  <button type="submit" className="auth-btn" style={{ marginTop: '0' }} disabled={qrLoading}>{qrLoading ? 'Mendaftarkan Meja...' : (<><PinIcon /> Simpan & Daftarkan Meja</>)}</button>
                </form>

                <div className="qr-live-preview-section">
                  <span className="preview-label">Live Preview QR Code:</span>
                  <div className="qr-preview-box">
                    {qrTableNumber ? (
                      <div className="qr-preview-content">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${CLIENT_BASE_URL}/?meja=` + qrTableNumber)}`} alt={`QR Meja ${qrTableNumber}`} className="qr-preview-image" />
                        <span className="qr-preview-table-label">MEJA {qrTableNumber}</span>
                        <p className="qr-preview-url">{CLIENT_BASE_URL}/?meja={qrTableNumber}</p>
                      </div>
                    ) : (
                      <div className="qr-preview-placeholder"><span>Masukkan nomor meja untuk melihat preview QR Code instan</span></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="qrcode-list-card">
                <h3 className="generator-title"><PinIcon /> Daftar Meja Terdaftar ({qrcodes.length})</h3>
                <QrCodes qrcodes={qrcodes} loading={false} onDelete={handleDeleteQrCode} />
              </div>
            </div>
          )}

          {activeTab === 'kategori' && (
            <div style={{ width: '100%' }}><KategoriTab /></div>
          )}

          {activeTab === 'produk' && (
            <div style={{ width: '100%' }}><ProdukTab /></div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardKasir;
