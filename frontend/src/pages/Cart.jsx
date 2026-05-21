import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { getMenuImage, formatPrice, submitOrder, validateTable, getTableOrders } from '../services/api';

function Cart() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawTable = searchParams.get('meja');
  const tableNumber = (rawTable && rawTable !== 'null' && rawTable !== 'undefined') ? rawTable : null;

  useEffect(() => {
    if (tableNumber) {
      console.log(`%c[USER ACCESS] Mengakses Halaman Keranjang Belanja - Meja: ${tableNumber}`, 'color: #4caf50; font-weight: bold; font-size: 12px;');
    } else {
      console.log(`%c[USER ACCESS] Mengakses Halaman Keranjang Belanja - Tanpa Scan QR Code`, 'color: #fbbf24; font-weight: bold; font-size: 12px;');
    }
  }, [tableNumber]);


  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [nameError, setNameError] = useState('');
  const [activeTab, setActiveTab] = useState('cart'); // 'cart' or 'orders'
  const [tableOrders, setTableOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!tableNumber) {
      setLoading(false);
      return;
    }
    async function checkTable() {
      try {
        setLoading(true);
        setError(null);
        await validateTable(tableNumber);
      } catch (err) {
        console.error('Meja tidak valid:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    checkTable();
  }, [tableNumber]);

  // Fetch recent orders for this dining table
  const fetchTableOrders = async (showIndicator = false) => {
    if (!tableNumber) return;
    if (showIndicator) setLoadingOrders(true);
    try {
      const orders = await getTableOrders(tableNumber);
      // Sort newest first
      setTableOrders((orders || []).sort((a, b) => b.order_time.localeCompare(a.order_time)));
    } catch (err) {
      console.error('Gagal mengambil data pesanan meja:', err);
    } finally {
      if (showIndicator) setLoadingOrders(false);
    }
  };

  // Poll for table orders update in the background
  useEffect(() => {
    if (tableNumber) {
      fetchTableOrders(false);
      const interval = setInterval(() => {
        fetchTableOrders(false);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [tableNumber]);

  const handleCheckout = async () => {
    if (cartItems.length === 0 || !tableNumber) return;

    if (!customerName || !customerName.trim()) {
      setNameError('Nama pemesan wajib diisi!');
      const inputEl = document.getElementById('customer-name-input');
      if (inputEl) inputEl.focus();
      return;
    }

    if (customerName.trim().length < 3) {
      setNameError('Nama pemesan minimal 3 karakter!');
      const inputEl = document.getElementById('customer-name-input');
      if (inputEl) inputEl.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        table_number: parseInt(tableNumber),
        customer_name: customerName.trim(),
        total_amount: totalPrice,
        items: cartItems.map(item => ({
          product_id: item.id,
          menu_item_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const result = await submitOrder(orderData);

      if (result.success) {
        clearCart();
        navigate(`/order-success?meja=${tableNumber}&order_id=${result.data.order_id}`);
      }
    } catch (err) {
      console.error('Gagal mengirim pesanan:', err);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar tableNumber={tableNumber} />

      <div className="page-content">
        {/* Header */}
        <div className="cart-header" id="cart-header">
          <button
            className="back-button"
            id="back-to-menu"
            onClick={() => navigate(tableNumber ? `/?meja=${tableNumber}` : '/')}
            aria-label="Kembali ke menu"
          >
            ←
          </button>
          <h1 className="cart-title">Keranjang</h1>
        </div>

        {/* Tab Menu for Dining Table Customers */}
        {tableNumber && (
          <div className="tab-menu" id="cart-tab-menu" style={{ marginBottom: 'var(--space-lg)' }}>
            <button
              className={`tab-item ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              🛒 Keranjang ({totalItems})
            </button>
            <button
              className={`tab-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('orders');
                fetchTableOrders(true);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              📋 Status Pesanan
              {tableOrders.filter(o => o.status === 'pending' || o.status === 'processing' || o.status === 'diproses').length > 0 && (
                <span 
                  className="cart-badge" 
                  style={{ 
                    position: 'static', 
                    transform: 'none', 
                    minWidth: '18px', 
                    height: '18px', 
                    fontSize: '0.65rem', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  {tableOrders.filter(o => o.status === 'pending' || o.status === 'processing' || o.status === 'diproses').length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* QR Warning Banner */}
        {!tableNumber && (
          <div className="qr-warning-banner" id="qr-warning-banner" style={{ marginTop: 'var(--space-md)' }}>
            <span className="warning-icon">⚠️</span>
            <div>
              <h3>Perlu Scan QR Code</h3>
              <p>Silakan scan QR Code di meja Anda terlebih dahulu untuk dapat mengirim pesanan.</p>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
            <div className="spinner" style={{ borderTopColor: 'var(--color-accent)' }}></div>
          </div>
        ) : error ? (
          <div className="db-error-alert" id="db-error-alert">
            <span className="error-icon">⚠️</span>
            <div>
              <h3>Akses Meja Gagal</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : activeTab === 'cart' ? (
          cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="cart-empty" id="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h2 className="cart-empty-title">Keranjang Masih Kosong</h2>
              <p className="cart-empty-text">
                Yuk, pilih menu favoritmu dan tambahkan ke keranjang!
              </p>
              <button
                className="cart-empty-btn"
                onClick={() => navigate(`/?meja=${tableNumber}`)}
              >
                Lihat Menu
              </button>
            </div>
          ) : (
            <div className="cart-container-layout" id="cart-container-layout">
              {/* Left Column: Cart Items */}
              <div className="cart-left-col" id="cart-left-col">
                <div className="cart-items" id="cart-items-list">
                  {cartItems.map((item, index) => (
                    <div
                      className="cart-item"
                      key={item.id}
                      id={`cart-item-${item.id}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="cart-item-image">
                        <img src={getMenuImage(item.image_url)} alt={item.name} />
                      </div>

                      <div className="cart-item-info">
                        <div>
                          <h3 className="cart-item-name">{item.name}</h3>
                          <p className="cart-item-price">{formatPrice(item.price)} / item</p>
                        </div>

                        <div className="cart-item-actions">
                          <div className="qty-control">
                            <button
                              className="qty-btn minus"
                              onClick={() => decreaseQuantity(item.id)}
                              aria-label="Kurangi"
                            >
                              −
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              className="qty-btn plus"
                              onClick={() => addToCart(item)}
                              aria-label="Tambah"
                            >
                              +
                            </button>
                          </div>

                          <span className="cart-item-subtotal">
                            {formatPrice(item.price * item.quantity)}
                          </span>

                          <button
                            className="delete-item-btn"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Hapus ${item.name}`}
                            title="Hapus item"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Order Summary & Checkout Button */}
              <div className="cart-right-col" id="cart-right-col">
                {tableNumber && (
                  <div className="cart-summary" style={{ marginBottom: 'var(--space-md)' }}>
                    <label htmlFor="customer-name-input" style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-sm)'
                    }}>
                      Nama Pemesan <span style={{ color: 'var(--color-danger)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="customer-name-input"
                      placeholder="Masukkan nama Anda..."
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        setNameError('');
                      }}
                      style={{
                        width: '100%',
                        padding: '12px var(--space-md)',
                        borderRadius: 'var(--radius-md)',
                        border: nameError ? '1.5px solid var(--color-danger)' : '1.5px solid var(--color-border)',
                        background: 'var(--color-bg-elevated)',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all var(--transition-normal)'
                      }}
                      required
                    />
                    {nameError && (
                      <span className="error-message" style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        color: 'var(--color-danger)',
                        marginTop: 'var(--space-xs)',
                        fontWeight: '500'
                      }}>
                        ⚠️ {nameError}
                      </span>
                    )}
                  </div>
                )}

                <div className="cart-summary" id="cart-summary">
                  <div className="cart-summary-row">
                    <span>Jumlah Item</span>
                    <span>{totalItems} item</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Nomor Meja</span>
                    {tableNumber ? (
                      <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>
                        Meja {tableNumber}
                      </span>
                    ) : (
                      <span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>
                        Belum Scan QR
                      </span>
                    )}
                  </div>
                  <div className="cart-summary-row total">
                    <span>Total</span>
                    <span className="amount">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button
                  className="checkout-button"
                  id="checkout-button"
                  onClick={handleCheckout}
                  disabled={isSubmitting || !tableNumber}
                  style={!tableNumber ? { background: 'var(--color-text-muted)', cursor: 'not-allowed', opacity: 0.6 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Mengirim Pesanan...
                    </>
                  ) : !tableNumber ? (
                    <>
                      Perlu Scan QR Code
                    </>
                  ) : (
                    <>
                      Kirim Pesanan — {formatPrice(totalPrice)}
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        ) : (
          /* Render Active Orders Tab */
          loadingOrders ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
              <div className="spinner" style={{ borderTopColor: 'var(--color-accent)' }}></div>
            </div>
          ) : tableOrders.length === 0 ? (
            <div className="cart-empty" id="orders-empty">
              <div className="cart-empty-icon">📋</div>
              <h2 className="cart-empty-title">Belum Ada Pesanan</h2>
              <p className="cart-empty-text">
                Kamu belum mengirim pesanan apa pun dari Meja {tableNumber} hari ini.
              </p>
              <button
                className="cart-empty-btn"
                onClick={() => navigate(`/?meja=${tableNumber}`)}
              >
                Lihat Menu
              </button>
            </div>
          ) : (
            <div className="orders-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {tableOrders.map((order, index) => (
                <div
                  className="cart-item"
                  key={order.id}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 'var(--space-sm)',
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {/* Order Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                        Pesanan #{order.id}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {new Date(order.order_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB • {order.customer_name || 'Pelanggan'}
                      </span>
                    </div>
                    
                    {/* Premium Styled Status Badge */}
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        backgroundColor: 
                          order.status === 'completed' || order.status === 'selesai' ? 'var(--color-success-bg)' :
                          order.status === 'cancelled' ? 'rgba(248, 113, 113, 0.12)' :
                          order.status === 'processing' || order.status === 'diproses' ? 'var(--color-accent-soft)' :
                          'rgba(251, 191, 36, 0.12)',
                        color:
                          order.status === 'completed' || order.status === 'selesai' ? 'var(--color-success)' :
                          order.status === 'cancelled' ? 'var(--color-danger)' :
                          order.status === 'processing' || order.status === 'diproses' ? 'var(--color-accent)' :
                          'var(--color-warning)'
                      }}
                    >
                      {order.status === 'processing' || order.status === 'diproses' ? 'Sedang Dimasak' :
                       order.status === 'completed' || order.status === 'selesai' ? 'Selesai' :
                       order.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu'}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 'var(--space-xs) 0' }}>
                    {order.items && order.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                          {item.quantity} x {item.name || `Menu ID ${item.product_id}`}
                        </span>
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: '600' }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Card Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-sm)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                      Total Pembayaran
                    </span>
                    <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--color-accent)' }}>
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Cart;
