import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawTable = searchParams.get('meja');
  const tableNumber = (rawTable && rawTable !== 'null' && rawTable !== 'undefined') ? rawTable : null;
  const orderId = searchParams.get('order_id') || '-';

  useEffect(() => {
    if (!tableNumber) {
      navigate('/');
      return;
    }
    console.log(`%c[USER ACCESS] Mengakses Halaman Konfirmasi Pesanan - Meja: ${tableNumber}, Order ID: #${orderId}`, 'color: #4caf50; font-weight: bold; font-size: 12px;');
  }, [tableNumber, orderId, navigate]);

  if (!tableNumber) {
    return null;
  }


  return (
    <div className="app-container">
      <div className="page-content" style={{ paddingTop: '40px' }}>
        <div className="success-page" id="order-success-page">
          {/* Success Icon with Ripple */}
          <div className="success-icon-wrapper">
            <div className="success-icon">✅</div>
            <div className="success-ripple"></div>
          </div>

          {/* Title */}
          <h1 className="success-title">Pesanan Terkirim!</h1>

          {/* Message */}
          <p className="success-message">
            Pesanan Anda sedang diproses oleh dapur kami. <br />
            Silakan menunggu di meja Anda. 🍽️
          </p>

          {/* Table Info */}
          <div className="success-table-info" id="success-table-info">
            📍 Meja {tableNumber}
          </div>

          {/* Order ID */}
          <div className="success-order-id" id="success-order-id">
            Order ID: <strong>#{orderId}</strong>
          </div>

          {/* Back Button */}
          <button
            className="success-btn"
            id="back-to-menu-btn"
            onClick={() => navigate(`/?meja=${tableNumber}`)}
          >
            Pesan Lagi
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
