import React from 'react';

export default function CartDrawer({ cartItems, tableNumber, onClose, onRemove, onIncrease, onDecrease, onCheckout, checkoutState }) {
  const total = cartItems.reduce((sum, item) => sum + item.qty * parseFloat(item.price || 0), 0);

  return (
    <div style={styles.backdrop}>
      <div style={styles.drawer}>
        <div style={styles.header}>
          <div>
            <div style={styles.title}>Keranjang Saya</div>
            <div style={styles.subTitle}>{tableNumber ? `Meja ${tableNumber}` : 'Tentukan nomor meja sebelum checkout'}</div>
          </div>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Tutup keranjang">×</button>
        </div>

        <div style={styles.body}>
          {cartItems.length === 0 ? (
            <div style={styles.emptyState}>Keranjang kosong. Tambahkan menu terlebih dahulu.</div>
          ) : (
            <div style={styles.itemList}>
              {cartItems.map(item => (
                <div key={item.id} style={styles.itemRow}>
                  <div>
                    <div style={styles.itemName}>{item.name}</div>
                    <div style={styles.itemMeta}>Rp {Number(item.price).toLocaleString('id-ID')} • Qty {item.qty}</div>
                  </div>
                  <div style={styles.qtyControls}>
                    <button style={styles.qtyButton} onClick={() => onDecrease(item.id)}>-</button>
                    <span style={styles.qtyValue}>{item.qty}</span>
                    <button style={styles.qtyButton} onClick={() => onIncrease(item.id)}>+</button>
                  </div>
                  <button style={styles.removeBtn} onClick={() => onRemove(item.id)}>Hapus</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalValue}>Rp {Number(total).toLocaleString('id-ID')}</span>
          </div>
          {checkoutState && (
            <div style={checkoutState.error ? styles.errorText : styles.successText}>
              {checkoutState.message}
            </div>
          )}
          <button
            style={styles.checkoutBtn}
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

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 2000,
    padding: '1rem'
  },
  drawer: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 24px 80px rgba(15, 23, 42, 0.18)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 2rem)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb'
  },
  title: { fontSize: '1.25rem', fontWeight: 700, color: '#111827' },
  subTitle: { marginTop: '0.35rem', color: '#6b7280', fontSize: '0.95rem' },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.75rem',
    lineHeight: 1,
    color: '#374151',
    cursor: 'pointer'
  },
  body: { padding: '1.5rem', overflowY: 'auto', flex: 1 },
  emptyState: { color: '#6b7280', fontSize: '0.95rem' },
  itemList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  itemRow: { display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', alignItems: 'center', padding: '1rem', borderRadius: '18px', backgroundColor: '#f8fafc' },
  itemName: { fontWeight: 600, color: '#111827' },
  itemMeta: { marginTop: '0.35rem', color: '#6b7280', fontSize: '0.9rem' },
  qtyControls: { display: 'flex', alignItems: 'center', gap: '0.35rem' },
  qtyButton: { width: '32px', height: '32px', borderRadius: '12px', border: '1px solid #d1d5db', backgroundColor: '#ffffff', cursor: 'pointer', color: '#111827', fontSize: '1rem' },
  qtyValue: { minWidth: '24px', textAlign: 'center', fontWeight: 700 },
  removeBtn: { border: 'none', background: 'transparent', color: '#ef4444', fontWeight: 600, cursor: 'pointer' },
  footer: { padding: '1.5rem', borderTop: '1px solid #e5e7eb' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  totalLabel: { color: '#6b7280', fontWeight: 600 },
  totalValue: { fontSize: '1.15rem', fontWeight: 700, color: '#111827' },
  checkoutBtn: { width: '100%', padding: '0.95rem 1rem', borderRadius: '14px', border: 'none', backgroundColor: '#0f766e', color: 'white', fontWeight: 700, cursor: 'pointer' },
  errorText: { color: '#b91c1c', marginBottom: '0.75rem', fontSize: '0.95rem' },
  successText: { color: '#15803d', marginBottom: '0.75rem', fontSize: '0.95rem' }
};
