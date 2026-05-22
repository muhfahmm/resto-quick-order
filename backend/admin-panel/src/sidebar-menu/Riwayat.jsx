import React from 'react';

export default function Riwayat({ orders = [], loading, historyFilter, setHistoryFilter, onUpdateStatus, formatPrice, formatTime }) {
  const historyOrders = orders.filter(o => {
    if (historyFilter === 'active') {
      return o.status === 'pending' || o.status === 'processing' || o.status === 'diproses';
    }
    if (historyFilter === 'completed') return o.status === 'completed' || o.status === 'selesai';
    if (historyFilter === 'cancelled') return o.status === 'cancelled';
    return true;
  });

  const activeCount = orders.filter(o => o.status === 'pending' || o.status === 'processing' || o.status === 'diproses').length;

  return (
    <div>
      <div className="history-filters">
        <button className={`filter-pill ${historyFilter === 'all' ? 'active' : ''}`} onClick={() => setHistoryFilter('all')}>
          Semua Pesanan ({orders.length})
        </button>
        <button className={`filter-pill ${historyFilter === 'active' ? 'active' : ''}`} onClick={() => setHistoryFilter('active')}>
          Aktif ({activeCount})
        </button>
        <button className={`filter-pill ${historyFilter === 'completed' ? 'active' : ''}`} onClick={() => setHistoryFilter('completed')}>
          Selesai ({orders.filter(o => o.status === 'completed' || o.status === 'selesai').length})
        </button>
        <button className={`filter-pill ${historyFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setHistoryFilter('cancelled')}>
          Dibatalkan ({orders.filter(o => o.status === 'cancelled').length})
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <div className="spinner" style={{ borderTopColor: 'var(--color-primary)' }}></div>
        </div>
      ) : historyOrders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3 className="empty-title">Tidak Ada Pesanan</h3>
          <p className="empty-desc">Belum ada transaksi dengan status pencarian ini.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Meja</th>
                <th>Nama Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Waktu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {historyOrders.map((o, idx) => (
                <tr key={o.id}>
                  <td>{idx + 1}</td>
                  <td>#{o.id}</td>
                  <td>Meja {o.table_number}</td>
                  <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{o.customer_name || '-'}</td>
                  <td style={{ maxWidth: 360 }}>
                    {o.items && o.items.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {o.items.map((it, i) => (
                          <span key={i} style={{ fontSize: '0.95rem' }}>{it.quantity} x {it.name || (`Menu ID ${it.product_id || it.menu_item_id}`)}</span>
                        ))}
                      </div>
                    ) : '-'}
                  </td>
                  <td>{formatPrice(o.total_amount)}</td>
                  <td><span className={`status-badge ${o.status}`}>{o.status === 'processing' ? 'diproses' : o.status}</span></td>
                  <td>{formatTime(o.order_time)}</td>
                  <td className="table-actions">
                    {o.status === 'pending' && (
                      <>
                        <button className="btn-small" onClick={() => onUpdateStatus(o.id, 'processing')}>Proses</button>
                        <button className="btn-small" onClick={() => onUpdateStatus(o.id, 'cancelled')}>Tolak</button>
                      </>
                    )}
                    {(o.status === 'processing' || o.status === 'diproses') && (
                      <button className="btn-small" onClick={() => onUpdateStatus(o.id, 'completed')}>Selesaikan</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
