import React from 'react';

export default function QRISModal({ total, onClose, onSimulateSuccess }) {
  return (
    <div className="qris-modal-overlay">
      <div className="qris-modal-content">
        <h2>Pembayaran QRIS</h2>
        <p>Scan QR di bawah ini untuk membayar:</p>
        <div className="qr-placeholder" style={{ width: 150, height: 150, background: '#ccc', margin: '10px auto' }}></div>
        <h3>Total: Rp {total.toLocaleString('id-ID')}</h3>
        <button onClick={onSimulateSuccess}>Simulasi Lunas</button>
        <button onClick={onClose}>Batal</button>
      </div>
    </div>
  );
}
