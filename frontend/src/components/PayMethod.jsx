import { useState } from 'react';
import { formatPrice } from '../services/api';

const PAYMENT_OPTIONS = [
  {
    id: 'cash',
    label: 'Tunai',
    description: 'Bayar di kasir setelah pesanan siap',
    icon: '💵',
  },
  {
    id: 'qris',
    label: 'QRIS',
    description: 'Scan QR di kasir atau meja',
    icon: '📱',
  },
  {
    id: 'debit',
    label: 'Kartu Debit',
    description: 'Tap / insert kartu di EDC',
    icon: '💳',
  },
  {
    id: 'ewallet',
    label: 'E-Wallet',
    description: 'GoPay, OVO, DANA, ShopeePay',
    icon: '📲',
  },
];

function PayMethod({ isOpen, onClose, onConfirm, totalPrice, tableNumber, isSubmitting }) {
  const [selectedMethod, setSelectedMethod] = useState('cash');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(selectedMethod);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="pay-method-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pay-method-title"
      >
        <div className="modal-header">
          <div>
            <h3 id="pay-method-title" className="modal-title">Metode Pembayaran</h3>
            <p className="modal-subtitle">
              Meja {tableNumber} · Total {formatPrice(totalPrice)}
            </p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Tutup">
            ✕
          </button>
        </div>

        <div className="pay-method-list">
          {PAYMENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`pay-method-option ${selectedMethod === option.id ? 'selected' : ''}`}
              onClick={() => setSelectedMethod(option.id)}
            >
              <span className="pay-method-icon">{option.icon}</span>
              <span className="pay-method-info">
                <span className="pay-method-label">{option.label}</span>
                <span className="pay-method-desc">{option.description}</span>
              </span>
              <span className={`pay-method-radio ${selectedMethod === option.id ? 'checked' : ''}`} />
            </button>
          ))}
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-btn secondary" onClick={onClose} disabled={isSubmitting}>
            Batal
          </button>
          <button
            type="button"
            className="modal-btn primary"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                Mengirim...
              </>
            ) : (
              <>Konfirmasi & Kirim — {formatPrice(totalPrice)}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayMethod;
export { PAYMENT_OPTIONS };
