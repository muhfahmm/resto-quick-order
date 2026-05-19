import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';
import PaymentConfirmationModal from '../modals/PaymentConfirmationModal';
import SuccessOrderModal from '../modals/SuccessOrderModal';

const getApiUrl = (path) => import.meta.env.PROD ? path : `http://localhost:3005${path}`;

const CustomerPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [tableNumber, setTableNumber] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState(null);
  const [activeView, setActiveView] = useState('menu'); // 'menu', 'history', 'reservation'
  const [historyOrders, setHistoryOrders] = useState([]);
  const [localReservations, setLocalReservations] = useState([]);
  const [historySubTab, setHistorySubTab] = useState('orders'); // 'orders', 'reservations'

  // Modal and Animation States
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [flyingParticles, setFlyingParticles] = useState([]);
  const [cartBouncing, setCartBouncing] = useState(false);

  // Reservation Form State
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resTable, setResTable] = useState(null);
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('18:00');
  const [resState, setResState] = useState(null); // { success: boolean, message: string, loading: boolean }
  const [qrcodes, setQrcodes] = useState([]);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) {
      setTableNumber(table);
    }

    loadHistory();
    loadLocalReservations();

    fetch(getApiUrl('/api/menu'))
      .then(res => res.json())
      .then(data => {
        setMenus(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    fetch(getApiUrl('/api/qrcodes'))
      .then(res => res.json())
      .then(data => {
        setQrcodes(data);
      })
      .catch(err => {
        console.error(err);
      });

    const handleOutsideClick = (e) => {
      if (!e.target.closest('.custom-dropdown-container')) {
        setTimeDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('quickorder_history') || '[]');
    setHistoryOrders(saved);
  };

  const saveHistory = (orders) => {
    localStorage.setItem('quickorder_history', JSON.stringify(orders));
    setHistoryOrders(orders);
  };

  const loadLocalReservations = () => {
    const saved = JSON.parse(localStorage.getItem('quickorder_reservations') || '[]');
    setLocalReservations(saved);
  };

  const saveLocalReservations = (resList) => {
    localStorage.setItem('quickorder_reservations', JSON.stringify(resList));
    setLocalReservations(resList);
  };

  const syncHistoryStatus = async () => {
    if (historyOrders.length === 0) return;
    try {
      const res = await fetch(getApiUrl('/api/orders'));
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

  const syncReservationsStatus = async () => {
    if (localReservations.length === 0) return;
    try {
      const res = await fetch(getApiUrl('/api/reservations'));
      const data = await res.json();
      const statusMap = Object.fromEntries(data.map(r => [r.id, r.status]));
      const updated = localReservations.map(r => ({
        ...r,
        status: statusMap[r.id] || r.status
      }));
      saveLocalReservations(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenHistory = () => {
    setActiveView('history');
    syncHistoryStatus();
    syncReservationsStatus();
  };

  const handleDeleteHistoryItem = (orderId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini dari riwayat Anda?')) {
      const updated = historyOrders.filter(order => order.id !== orderId);
      saveHistory(updated);
    }
  };

  const handleDeleteReservationItem = (resId) => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan/menghapus reservasi tempat ini?')) {
      const updated = localReservations.filter(r => r.id !== resId);
      saveLocalReservations(updated);
    }
  };

  const handleCreateReservation = async (e) => {
    e.preventDefault();
    if (!resName || !resPhone || !resTable || !resDate || !resTime) {
      setResState({ success: false, message: 'Semua kolom wajib diisi, termasuk memilih nomor meja.' });
      return;
    }
    setResState({ loading: true, message: 'Mengirim permohonan reservasi...' });

    try {
      const response = await fetch(getApiUrl('/api/reservations'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resName,
          phone: resPhone,
          table_no: resTable,
          reservation_date: resDate,
          reservation_time: resTime
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Gagal membuat reservasi.');
      }

      const newRes = {
        id: data.reservation.id,
        name: resName,
        phone: resPhone,
        table_no: resTable,
        reservation_date: resDate,
        reservation_time: resTime,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const updatedReservations = [newRes, ...localReservations];
      saveLocalReservations(updatedReservations);

      setResState({ success: true, message: `Reservasi Meja ${resTable} sukses terkirim! Silakan tunggu konfirmasi admin.` });
      
      // Reset Form
      setResName('');
      setResPhone('');
      setResTable(null);
      setResDate('');
    } catch (err) {
      console.error(err);
      setResState({ success: false, message: err.message || 'Gagal mengirim permohonan reservasi.' });
    }
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
    if (!tableNumber) {
      alert("Silakan scan QR Code meja atau pilih nomor meja Anda terlebih dahulu untuk mulai memesan.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    triggerAddAnimation(e);
    addToCart({ id: menu.id, name: menu.name, price: menu.price, image_url: menu.image_url });
    setCheckoutState(null);
  };

  const handleIncreaseWithAnim = (e, menuId) => {
    if (!tableNumber) {
      alert("Silakan scan QR Code meja atau pilih nomor meja Anda terlebih dahulu untuk mulai memesan.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    triggerAddAnimation(e);
    increaseQty(menuId);
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
      const response = await fetch(getApiUrl('/api/orders'), {
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
      setSuccessModalOpen(true);
      setCheckoutState(null);
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
          width: 92%;
          max-width: 380px;
          background-color: rgba(15, 23, 42, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 6px 8px;
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
          padding: 8px 12px;
          border-radius: 20px;
          flex: 1;
        }

        .mobile-nav-item svg {
          width: 20px;
          height: 20px;
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

        /* History sub tabs layout */
        .history-subtabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .subtab-button {
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          font-size: 0.88rem;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .subtab-button.active {
          background-color: #0f766e;
          color: #ffffff;
          border-color: #0f766e;
          box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
        }

        /* Modern Card-Based History Layout Styles (No Scroll) */
        .history-list-container {
          width: 100%;
        }

        .history-empty-state {
          text-align: center;
          padding: 3.5rem 1.5rem;
          color: #64748b;
          font-weight: 600;
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .history-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .history-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .history-order-card {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 1.25rem;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.01);
          border: 1px solid rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.25s ease;
        }

        .history-order-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 35px rgba(15, 23, 42, 0.04);
        }

        .history-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed #e2e8f0;
          padding-bottom: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .order-meta-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .order-id-label {
          font-size: 1.05rem;
          font-weight: 850;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .order-table-badge {
          background-color: #eff6ff;
          color: #2563eb;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .order-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .order-status-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .order-status-badge.status-pending {
          background-color: #fef3c7;
          color: #b45309;
        }

        .order-status-badge.status-cooking,
        .order-status-badge.status-ready {
          background-color: #e0f2fe;
          color: #0369a1;
        }

        .order-status-badge.status-confirmed {
          background-color: #dcfce7;
          color: #15803d;
        }

        .order-status-badge.status-completed {
          background-color: #f1f5f9;
          color: #475569;
        }

        .order-status-badge.status-cancelled {
          background-color: #fde8e8;
          color: #9b1c1c;
        }

        .order-delete-btn {
          background: #fef2f2;
          color: #ef4444;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .order-delete-btn:hover {
          background: #fee2e2;
          transform: scale(1.05);
        }

        .order-delete-btn svg {
          width: 16px;
          height: 16px;
        }

        .history-card-body {
          flex: 1;
          margin-bottom: 0.85rem;
        }

        .history-items-title {
          font-size: 0.78rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.5rem;
        }

        .history-items-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .history-item-row-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
        }

        .history-item-left {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }

        .history-item-qty-badge {
          background-color: #f1f5f9;
          color: #475569;
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 750;
        }

        .history-item-name-text {
          color: #334155;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .history-item-price-val {
          color: #1e293b;
          font-weight: 700;
        }

        .history-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f8fafc;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
        }

        .payment-method-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
        }

        .order-total-block {
          text-align: right;
        }

        .order-total-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          display: block;
        }

        .order-total-value {
          font-size: 1.1rem;
          font-weight: 850;
          color: #0f766e;
        }

        .order-time-stamp {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 0.65rem;
          text-align: right;
          font-weight: 500;
        }

        /* Table Reservations Form Styling */
        .reservation-box {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.05);
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .reservation-box {
            padding: 1.25rem;
          }
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 1.25rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 750;
          color: #475569;
        }

        .form-input {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #ff5722;
          box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.12);
        }

        /* Interactive Table Grid Selector */
        .table-selector-section {
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }

        .table-select-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .table-select-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
        }

        .table-select-card {
          background-color: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 12px;
          text-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: all 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .table-select-card:hover {
          background-color: #ffffff;
          border-color: #ff5722;
          transform: translateY(-2px);
        }

        .table-select-card.selected {
          background-color: #fff3f0;
          border-color: #ff5722;
          box-shadow: 0 6px 16px rgba(255, 87, 34, 0.15);
          transform: scale(1.05);
        }

        .table-select-card-num {
          font-size: 1.15rem;
          font-weight: 850;
          color: #0f172a;
        }

        .table-select-card.selected .table-select-card-num {
          color: #ff5722;
        }

        .table-select-card-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
        }

        .res-submit-btn {
          width: 100%;
          padding: 0.95rem;
          border-radius: 14px;
          border: none;
          background-color: #ff5722;
          color: white;
          font-weight: 750;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255, 87, 34, 0.2);
          transition: all 0.2s ease;
        }

        .res-submit-btn:hover:not(:disabled) {
          background-color: #e64a19;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(255, 87, 34, 0.3);
        }

        .res-submit-btn:disabled {
          background-color: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .res-status-banner {
          margin-top: 1rem;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 600;
          text-align: center;
        }

        .res-status-banner.success {
          background-color: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .res-status-banner.error {
          background-color: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        /* Custom Time Dropdown Styling */
        .custom-dropdown-container {
          position: relative;
          width: 100%;
        }

        .custom-dropdown-trigger {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e293b;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.22s ease;
          outline: none;
        }

        .custom-dropdown-trigger:focus {
          border-color: #ff5722;
          box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.12);
        }

        .dropdown-chevron {
          width: 16px;
          height: 16px;
          color: #64748b;
          transition: transform 0.2s ease;
        }

        .dropdown-chevron.open {
          transform: rotate(180deg);
          color: #ff5722;
        }

        .custom-dropdown-menu {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          padding: 6px;
          animation: slideDownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .custom-dropdown-menu::-webkit-scrollbar {
          width: 6px;
        }
        .custom-dropdown-menu::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 99px;
        }

        @keyframes slideDownFade {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .custom-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .custom-dropdown-item:hover {
          background-color: #fff3f0;
          color: #ff5722;
        }

        .custom-dropdown-item.active {
          background-color: #fff3f0;
          color: #ff5722;
        }

        .check-icon {
          width: 14px;
          height: 14px;
          color: #ff5722;
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
            Menu
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'reservation' ? 'active' : ''}`}
            onClick={() => setActiveView('reservation')}
          >
            Reservasi
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

      <main className="main-section">
        {tableNumber && activeView === 'menu' && (
          <div className="table-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="table-label">Meja</span>
              <span className="table-number">{tableNumber}</span>
            </div>
          </div>
        )}

        {!tableNumber && activeView === 'menu' && (
          <div className="table-selector-card-container" style={{
            background: 'white',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
            border: '1px solid rgba(15, 23, 42, 0.05)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 800, fontSize: '1.2rem', color: '#e11d48' }}>
              ⚠️ Meja Belum Terdeteksi
            </h3>
            <p style={{ margin: '0', color: '#64748b', fontSize: '0.92rem', fontWeight: 600, lineHeight: '1.5' }}>
              Silakan pindai / scan QR Code yang ada di meja tempat Anda duduk untuk mulai menambahkan hidangan ke keranjang belanja.
            </p>
          </div>
        )}

        {/* 1. RESERVATION VIEW */}
        {activeView === 'reservation' && (
          <>
            <h2 className="section-title">Reservasi Tempat & Meja</h2>
            <div className="reservation-box">
              <form onSubmit={handleCreateReservation}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Masukkan nama Anda" 
                      value={resName} 
                      onChange={(e) => setResName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp / HP</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="Contoh: 08123456789" 
                      value={resPhone} 
                      onChange={(e) => setResPhone(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pilih Tanggal Reservasi</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      value={resDate} 
                      onChange={(e) => setResDate(e.target.value)} 
                      min={new Date().toISOString().split('T')[0]}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pilih Jam / Waktu</label>
                    <div className="custom-dropdown-container">
                      <button
                        type="button"
                        className="custom-dropdown-trigger"
                        onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                      >
                        <span>🕒 {resTime} WIB</span>
                        <svg 
                          className={`dropdown-chevron ${timeDropdownOpen ? 'open' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {timeDropdownOpen && (
                        <div className="custom-dropdown-menu">
                          {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map(t => (
                            <div
                              key={t}
                              className={`custom-dropdown-item ${resTime === t ? 'active' : ''}`}
                              onClick={() => {
                                setResTime(t);
                                setTimeDropdownOpen(false);
                              }}
                            >
                              <span>🕒 {t} WIB</span>
                              {resTime === t && (
                                <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="table-selector-section">
                  <label className="form-label">Pilih Meja Restoran</label>
                  {qrcodes.length === 0 ? (
                    <div className="res-status-banner error" style={{ margin: '1rem 0', textAlign: 'center' }}>
                      ⚠️ Belum ada meja yang terdaftar untuk reservasi. Silakan hubungi admin.
                    </div>
                  ) : (
                    <div className="table-select-grid">
                      {qrcodes
                        .map(qr => qr.table_no)
                        .filter(Boolean)
                        .sort((a, b) => {
                          const numA = parseInt(a, 10);
                          const numB = parseInt(b, 10);
                          if (!isNaN(numA) && !isNaN(numB)) {
                            return numA - numB;
                          }
                          return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
                        })
                        .map(tbl => (
                          <div 
                            key={tbl} 
                            className={`table-select-card ${resTable === tbl ? 'selected' : ''}`}
                            onClick={() => setResTable(tbl)}
                          >
                            <span style={{ fontSize: '1.25rem' }}>🪑</span>
                            <span className="table-select-card-num">{tbl}</span>
                            <span className="table-select-card-label">Meja</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="res-submit-btn" 
                  disabled={resState?.loading}
                >
                  {resState?.loading ? 'Mengirim permohonan...' : 'Kirim Reservasi Tempat'}
                </button>

                {resState && !resState.loading && (
                  <div className={`res-status-banner ${resState.success ? 'success' : 'error'}`}>
                    {resState.message}
                  </div>
                )}
              </form>
            </div>
          </>
        )}

        {/* 2. HISTORY VIEW */}
        {activeView === 'history' && (
          <>
            <h2 className="section-title">Riwayat Saya</h2>
            
            {/* History Sub Tabs */}
            <div className="history-subtabs">
              <button 
                className={`subtab-button ${historySubTab === 'orders' ? 'active' : ''}`}
                onClick={() => setHistorySubTab('orders')}
              >
                📋 Pesanan Makanan ({historyOrders.length})
              </button>
              <button 
                className={`subtab-button ${historySubTab === 'reservations' ? 'active' : ''}`}
                onClick={() => setHistorySubTab('reservations')}
              >
                🪑 Reservasi Meja ({localReservations.length})
              </button>
            </div>

            <div className="history-list-container">
              {historySubTab === 'orders' ? (
                historyOrders.length === 0 ? (
                  <div className="history-empty-state">
                    <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>📋</span>
                    <p>Belum ada riwayat pesanan makanan.</p>
                  </div>
                ) : (
                  <div className="history-cards-grid">
                    {historyOrders.map(order => (
                      <div key={order.id} className="history-order-card">
                        <div className="history-card-header">
                          <div className="order-meta-info">
                            <span className="order-id-label">#{order.id}</span>
                            <span className="order-table-badge">Meja {order.tableNo}</span>
                          </div>
                          <div className="order-header-actions">
                            <span className={`order-status-badge status-${order.status || 'pending'}`}>
                              {order.status === 'pending' ? 'Menunggu Konfirmasi' :
                               order.status === 'confirmed' ? 'Dikonfirmasi' :
                               order.status === 'ready' ? 'Makanan Siap' :
                               order.status === 'completed' ? 'Selesai' : order.status}
                            </span>
                            <button 
                              className="order-delete-btn" 
                              onClick={() => handleDeleteHistoryItem(order.id)}
                              title="Hapus riwayat pesanan"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="history-card-body">
                          <div className="history-items-title">Detail Item</div>
                          <div className="history-items-list">
                            {order.items.map((item, idx) => (
                              <div key={`${order.id}-${item.id}-${idx}`} className="history-item-row-detail">
                                <div className="history-item-left">
                                  <span className="history-item-qty-badge">{item.qty}x</span>
                                  <span className="history-item-name-text">{item.name}</span>
                                </div>
                                <span className="history-item-price-val">
                                  Rp {Number(item.qty * parseFloat(item.price || 0)).toLocaleString('id-ID')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="history-card-footer">
                          <div className="payment-method-pill">
                            <span className="payment-method-icon">
                              {order.paymentMethod === 'Dana' ? '👛' : 
                               order.paymentMethod === 'Ovo' ? '💜' : 
                               order.paymentMethod === 'GoPay' ? '📱' : '💵'}
                            </span>
                            <span className="payment-method-name">
                              {order.paymentMethod || 'Dana'}
                            </span>
                          </div>
                          <div className="order-total-block">
                            <span className="order-total-title">Total</span>
                            <span className="order-total-value">
                              Rp {Number(order.total).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="order-time-stamp">
                          Dibuat pada: {new Date(order.createdAt).toLocaleString('id-ID')}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                localReservations.length === 0 ? (
                  <div className="history-empty-state">
                    <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>🪑</span>
                    <p>Belum ada riwayat booking meja.</p>
                  </div>
                ) : (
                  <div className="history-cards-grid">
                    {localReservations.map(res => (
                      <div key={res.id} className="history-order-card" style={{ borderLeft: '5px solid #ff5722' }}>
                        <div className="history-card-header">
                          <div className="order-meta-info">
                            <span className="order-id-label" style={{ color: '#ff5722' }}>Meja {res.table_no}</span>
                          </div>
                          <div className="order-header-actions">
                            <span className={`order-status-badge status-${res.status || 'pending'}`}>
                              {res.status === 'pending' ? 'Menunggu Konfirmasi' :
                               res.status === 'confirmed' ? 'Dikonfirmasi' :
                               res.status === 'cancelled' ? 'Dibatalkan' : res.status}
                            </span>
                            <button 
                              className="order-delete-btn" 
                              onClick={() => handleDeleteReservationItem(res.id)}
                              title="Batalkan reservasi"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="history-card-body">
                          <div className="history-items-title">Detail Reservasi</div>
                          <div className="history-items-list" style={{ gap: '8px' }}>
                            <div className="history-item-row-detail">
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Atas Nama</span>
                              <span style={{ fontWeight: 700, color: '#334155' }}>{res.name}</span>
                            </div>
                            <div className="history-item-row-detail">
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Tanggal</span>
                              <span style={{ fontWeight: 750, color: '#1e293b' }}>{res.reservation_date}</span>
                            </div>
                            <div className="history-item-row-detail">
                              <span style={{ color: '#64748b', fontWeight: 600 }}>Waktu / Jam</span>
                              <span style={{ fontWeight: 750, color: '#1e293b' }}>{res.reservation_time} WIB</span>
                            </div>
                            <div className="history-item-row-detail">
                              <span style={{ color: '#64748b', fontWeight: 600 }}>No. WhatsApp</span>
                              <span style={{ fontWeight: 700, color: '#334155' }}>{res.phone}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="order-time-stamp">
                          Diajukan: {new Date(res.createdAt).toLocaleString('id-ID')}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* 3. MENU VIEW */}
        {activeView === 'menu' && (
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
                                onClick={(e) => handleIncreaseWithAnim(e, menu.id)} 
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
          onClick={() => setActiveView('reservation')}
          className={`mobile-nav-item ${activeView === 'reservation' ? 'active' : ''}`}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Reservasi</span>
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

      {/* Success Order Confirmation Modal */}
      <SuccessOrderModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  );
};

export default CustomerPage;
