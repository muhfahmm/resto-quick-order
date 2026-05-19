import React from 'react';

export default function CartDrawer({ isOpen, cartItems, tableNumber, onClose, onRemove, onIncrease, onDecrease, onCheckout, checkoutState }) {
  const total = cartItems.reduce((sum, item) => sum + item.qty * parseFloat(item.price || 0), 0);

  return (
    <div 
      className={`cart-backdrop ${isOpen ? 'open' : ''}`} 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        .cart-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.65);
          display: flex;
          justify-content: flex-end;
          z-index: 2000;
          padding: 1rem;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          box-sizing: border-box;
        }

        .cart-backdrop.open {
          opacity: 1;
          visibility: visible;
        }

        .cart-drawer {
          width: 100%;
          max-width: 420px;
          background-color: #ffffff;
          border-radius: 24px;
          box-shadow: 0 24px 80px rgba(15, 23, 42, 0.18);
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 2rem);
          transform: translateX(110%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          box-sizing: border-box;
        }

        .cart-backdrop.open .cart-drawer {
          transform: translateX(0);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .cart-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .cart-subtitle {
          margin-top: 0.25rem;
          color: #64748b;
          font-size: 0.88rem;
          font-weight: 500;
        }

        .cart-close-btn {
          background: #f1f5f9;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
          line-height: 1;
        }

        .cart-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: rotate(90deg);
        }

        .cart-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .cart-empty-state {
          color: #64748b;
          font-size: 0.95rem;
          text-align: center;
          margin-top: 3rem;
          font-weight: 500;
        }

        .cart-item-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1rem;
          border-radius: 18px;
          background-color: #f8fafc;
          border: 1px solid #f1f5f9;
          gap: 0.75rem;
        }

        .cart-item-info {
          flex: 1;
          min-width: 0;
        }

        .cart-item-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cart-item-meta {
          margin-top: 0.25rem;
          color: #64748b;
          font-size: 0.82rem;
          font-weight: 500;
        }

        .cart-qty-controls {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .cart-qty-btn {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          cursor: pointer;
          color: #475569;
          font-size: 0.9rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .cart-qty-btn:hover {
          background-color: #f1f5f9;
          color: #0f172a;
          border-color: #94a3b8;
        }

        .cart-qty-val {
          min-width: 18px;
          text-align: center;
          font-weight: 800;
          font-size: 0.9rem;
          color: #0f172a;
        }

        .cart-remove-btn {
          border: none;
          background: transparent;
          color: #ef4444;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .cart-remove-btn:hover {
          background-color: #fef2f2;
        }

        .cart-footer {
          padding: 1.5rem;
          border-top: 1px solid #f1f5f9;
          background-color: #ffffff;
        }

        .cart-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .cart-total-label {
          color: #64748b;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .cart-total-val {
          font-size: 1.25rem;
          font-weight: 850;
          color: #0f766e;
        }

        .cart-checkout-btn {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          border: none;
          background-color: #0f766e;
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
          transition: all 0.2s ease;
        }

        .cart-checkout-btn:hover:not(:disabled) {
          background-color: #0d655d;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 118, 110, 0.25);
        }

        .cart-checkout-btn:disabled {
          background-color: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .cart-error-text {
          color: #b91c1c;
          margin-bottom: 0.75rem;
          font-size: 0.88rem;
          font-weight: 600;
          background-color: #fef2f2;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid #fecaca;
        }

        .cart-success-text {
          color: #15803d;
          margin-bottom: 0.75rem;
          font-size: 0.88rem;
          font-weight: 600;
          background-color: #f0fdf4;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid #bbf7d0;
        }
      `}</style>

      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div>
            <h2 className="cart-title">Keranjang Saya</h2>
            <div className="cart-subtitle">
              {tableNumber ? `Meja ${tableNumber}` : 'Tentukan nomor meja sebelum checkout'}
            </div>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Tutup keranjang">×</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">Keranjang kosong. Tambahkan menu terlebih dahulu.</div>
          ) : (
            <div className="cart-item-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-meta">
                      Rp {Number(item.price).toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="cart-qty-controls">
                    <button className="cart-qty-btn" onClick={() => onDecrease(item.id)}>-</button>
                    <span className="cart-qty-val">{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => onIncrease(item.id)}>+</button>
                  </div>
                  <button className="cart-remove-btn" onClick={() => onRemove(item.id)}>Hapus</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-val">Rp {Number(total).toLocaleString('id-ID')}</span>
          </div>
          
          {checkoutState && (
            <div className={checkoutState.error ? "cart-error-text" : "cart-success-text"}>
              {checkoutState.message}
            </div>
          )}

          <button
            className="cart-checkout-btn"
            onClick={onCheckout}
            disabled={cartItems.length === 0 || !tableNumber || checkoutState?.loading}
          >
            {checkoutState?.loading ? 'Memproses...' : 'Pesan & Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}
