import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { getMenuImage, formatPrice, submitOrder, validateTable } from '../services/api';

function Cart() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tableNumber = searchParams.get('meja') || '1';

  useEffect(() => {
    console.log(`%c[USER ACCESS] Mengakses Halaman Keranjang Belanja - Meja: ${tableNumber}`, 'color: #4caf50; font-weight: bold; font-size: 12px;');
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

  useEffect(() => {
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

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderData = {
        table_number: parseInt(tableNumber),
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
            onClick={() => navigate(`/?meja=${tableNumber}`)}
            aria-label="Kembali ke menu"
          >
            ←
          </button>
          <h1 className="cart-title">Keranjang</h1>
        </div>

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
        ) : cartItems.length === 0 ? (
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
                  <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>
                    Meja {tableNumber}
                  </span>
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Mengirim Pesanan...
                  </>
                ) : (
                  <>
                    Kirim Pesanan — {formatPrice(totalPrice)}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
