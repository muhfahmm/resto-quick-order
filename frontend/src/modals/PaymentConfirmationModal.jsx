import React, { useState } from 'react';

export default function PaymentConfirmationModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  total, 
  tableNumber, 
  onConfirm, 
  loading 
}) {
  const [selectedMethod, setSelectedMethod] = useState('Dana');

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'Dana', name: 'DANA', icon: '👛', color: '#118ee9' },
    { id: 'Ovo', name: 'OVO', icon: '💜', color: '#4c2a86' },
    { id: 'GoPay', name: 'GoPay', icon: '📱', color: '#00a5cf' },
    { id: 'Tunai', name: 'Kasir (Tunai)', icon: '💵', color: '#10b981' }
  ];

  const handleConfirm = () => {
    onConfirm(selectedMethod);
  };

  return (
    <div className="payment-backdrop" onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}>
      <style>{`
        .payment-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          padding: 1rem;
          box-sizing: border-box;
          animation: modalFadeIn 0.3s ease-out;
        }

        .payment-modal {
          width: 100%;
          max-width: 480px;
          background-color: #ffffff;
          border-radius: 28px;
          box-shadow: 0 30px 100px rgba(15, 23, 42, 0.25);
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 2rem);
          overflow: hidden;
          animation: modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideUp {
          from { transform: translateY(40px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .payment-header {
          padding: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          text-align: center;
        }

        .payment-title {
          font-size: 1.35rem;
          font-weight: 850;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .payment-subtitle {
          margin-top: 0.35rem;
          color: #64748b;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .payment-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .section-label {
          font-size: 0.85rem;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          display: block;
        }

        /* Order Items Summary List */
        .order-summary-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
          background-color: #f8fafc;
          padding: 1rem;
          border-radius: 20px;
          border: 1px solid #f1f5f9;
        }

        .summary-item-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .summary-item-image {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          object-fit: cover;
          background-color: #e2e8f0;
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .summary-item-info {
          flex: 1;
          min-width: 0;
        }

        .summary-item-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .summary-item-qty {
          margin-top: 0.2rem;
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
        }

        .summary-item-subtotal {
          font-weight: 800;
          color: #0f172a;
          font-size: 0.9rem;
        }

        /* Payment Methods grid */
        .payment-methods-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 1.5rem;
        }

        .payment-card {
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #ffffff;
          user-select: none;
          position: relative;
          box-sizing: border-box;
        }

        .payment-card:hover:not(.disabled) {
          border-color: #cbd5e1;
          background-color: #f8fafc;
        }

        .payment-card.active {
          border-color: var(--brand-color);
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
        }

        .payment-card.active::after {
          content: '✓';
          position: absolute;
          top: 8px;
          right: 8px;
          width: 18px;
          height: 18px;
          background-color: var(--brand-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 800;
        }

        .payment-icon {
          font-size: 1.6rem;
          margin-bottom: 0.35rem;
        }

        .payment-name {
          font-weight: 800;
          font-size: 0.88rem;
          color: #0f172a;
        }

        .payment-footer {
          padding: 1.5rem;
          border-top: 1px solid #f1f5f9;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .bill-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .bill-label {
          color: #64748b;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .bill-total {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0f766e;
        }

        .pay-confirm-btn {
          width: 100%;
          padding: 0.95rem 1rem;
          border-radius: 16px;
          border: none;
          background-color: #10b981;
          color: white;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
          transition: all 0.25s ease;
        }

        .pay-confirm-btn:hover:not(:disabled) {
          background-color: #059669;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
        }

        .pay-confirm-btn:disabled {
          background-color: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .pay-cancel-btn {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 16px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #475569;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pay-cancel-btn:hover:not(:disabled) {
          background-color: #f8fafc;
          color: #0f172a;
          border-color: #94a3b8;
        }
      `}</style>

      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-header">
          <h2 className="payment-title">Konfirmasi Pembayaran</h2>
          <div className="payment-subtitle">Meja {tableNumber}</div>
        </div>

        <div className="payment-body">
          <span className="section-label">Ringkasan Pesanan</span>
          <div className="order-summary-list">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item-row">
                <img 
                  src={item.image_url || 'http://placehold.co/100x100?text=Menu'} 
                  alt={item.name} 
                  className="summary-item-image" 
                />
                <div className="summary-item-info">
                  <div className="summary-item-name">{item.name}</div>
                  <div className="summary-item-qty">{item.qty} Porsi x Rp {Number(item.price).toLocaleString('id-ID')}</div>
                </div>
                <div className="summary-item-subtotal">
                  Rp {Number(item.qty * parseFloat(item.price || 0)).toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>

          <span className="section-label">Metode Pembayaran</span>
          <div className="payment-methods-grid">
            {paymentMethods.map(m => (
              <div 
                key={m.id}
                className={`payment-card ${selectedMethod === m.id ? 'active' : ''} ${loading ? 'disabled' : ''}`}
                style={{ '--brand-color': m.color }}
                onClick={() => { if (!loading) setSelectedMethod(m.id); }}
              >
                <span className="payment-icon">{m.icon}</span>
                <span className="payment-name">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="payment-footer">
          <div className="bill-summary">
            <span className="bill-label">Total Pembayaran</span>
            <span className="bill-total">Rp {Number(total).toLocaleString('id-ID')}</span>
          </div>

          <button 
            className="pay-confirm-btn" 
            onClick={handleConfirm}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? 'Memproses Pesanan...' : 'Konfirmasi & Kirim Pesanan'}
          </button>
          
          <button 
            className="pay-cancel-btn" 
            onClick={onClose}
            disabled={loading}
          >
            Kembali ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
