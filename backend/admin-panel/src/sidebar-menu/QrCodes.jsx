import React, { useState, useEffect } from 'react';

export default function QrCodes({ qrcodes = [], loading, onDelete }) {
  const [selectedQr, setSelectedQr] = useState(null);

  useEffect(() => {
    if (qrcodes.length > 0 && !selectedQr) {
      setSelectedQr(qrcodes[0]);
    }
  }, [qrcodes, selectedQr]);

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <div className="spinner" style={{ borderTopColor: 'var(--color-primary)' }}></div>
        </div>
      ) : qrcodes.length === 0 ? (
        <div className="empty-state" style={{ margin: '20px auto 0', maxWidth: '100%' }}>
          <div className="empty-icon">📭</div>
          <h3 className="empty-title">Belum Ada Meja Terdaftar</h3>
          <p className="empty-desc">Silakan buat meja baru di form sebelah kiri.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1.6fr 1fr', alignItems: 'start' }}>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Meja</th>
                  <th>Preview</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {qrcodes.map((qr, idx) => (
                  <tr key={qr.id} style={{ cursor: 'pointer', background: selectedQr?.id === qr.id ? 'rgba(59, 130, 246, 0.08)' : 'transparent' }} onClick={() => setSelectedQr(qr)}>
                    <td>{idx + 1}</td>
                    <td>Meja {qr.table_number}</td>
                    <td>
                      <img
                        src={qr.qr_code_url}
                        alt={`QR Meja ${qr.table_number}`}
                        style={{ width: 70, height: 70, borderRadius: 6, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.08)' }}
                      />
                    </td>
                    <td className="table-actions">
                      <button className="btn-small" onClick={(e) => { e.stopPropagation(); onDelete(qr.id); }}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '20px', borderRadius: '18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Preview QR Code</h3>
            {selectedQr ? (
              <div style={{ textAlign: 'center' }}>
                <img
                  src={selectedQr.qr_code_url}
                  alt={`QR Meja ${selectedQr.table_number}`}
                  style={{ width: '220px', height: '220px', borderRadius: 18, objectFit: 'cover', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <div style={{ marginBottom: '10px', fontWeight: 700 }}>Meja {selectedQr.table_number}</div>
                <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', wordBreak: 'break-all' }}>{selectedQr.qr_code_url}</div>
                <button
                  className="btn-small"
                  style={{ marginTop: '18px', width: '100%' }}
                  onClick={() => navigator.clipboard.writeText(selectedQr.qr_code_url)}
                >Salin URL</button>
              </div>
            ) : (
              <div style={{ padding: '32px 16px', color: 'rgba(255,255,255,0.6)' }}>
                Pilih baris QR Code untuk melihat preview lebih besar di sini.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
