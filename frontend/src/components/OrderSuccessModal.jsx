import { formatPrice } from '../services/api';

const PAYMENT_LABELS = {
  cash: 'Tunai',
  qris: 'QRIS',
  debit: 'Kartu Debit',
  ewallet: 'E-Wallet',
};

function OrderSuccessModal({
  isOpen,
  onClose,
  tableNumber,
  orderId,
  paymentMethod,
  totalAmount,
  onViewHistory,
}) {
  if (!isOpen) return null;

  const paymentLabel = PAYMENT_LABELS[paymentMethod] || paymentMethod;

  return (
    <div className="modal-overlay success-modal-overlay" role="presentation">
      <div
        className="order-success-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title"
      >
        <div className="success-modal-icon-ring">
          <div className="success-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="success-modal-ripple" />
        </div>

        <h2 id="order-success-title" className="success-modal-title">
          Pesanan Terkirim!
        </h2>
        <p className="success-modal-message">
          Pesanan Anda sedang diproses oleh dapur kami.
          <br />
          Silakan menunggu di meja Anda. 🍽️
        </p>

        <div className="success-modal-details">
          <div className="success-detail-chip">
            <span className="chip-label">Meja</span>
            <span className="chip-value">📍 {tableNumber}</span>
          </div>
          <div className="success-detail-chip">
            <span className="chip-label">Order ID</span>
            <span className="chip-value accent">#{orderId}</span>
          </div>
          <div className="success-detail-chip">
            <span className="chip-label">Pembayaran</span>
            <span className="chip-value">{paymentLabel}</span>
          </div>
          {totalAmount > 0 && (
            <div className="success-detail-chip full">
              <span className="chip-label">Total</span>
              <span className="chip-value accent">{formatPrice(totalAmount)}</span>
            </div>
          )}
        </div>

        <div className="success-modal-actions">
          <button type="button" className="modal-btn secondary" onClick={onViewHistory}>
            Lihat Histori
          </button>
          <button type="button" className="modal-btn primary" onClick={onClose}>
            Lanjut Belanja
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessModal;
