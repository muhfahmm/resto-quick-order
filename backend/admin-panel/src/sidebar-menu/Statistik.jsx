import React from 'react';
import { ClockIcon, CookIcon, CheckIcon, CogIcon } from '../components/TwIcons';

export default function Statistik({ orders = [], totalIncome = 0, topItems = [], maxQty = 1, pendingCount = 0, processingCount = 0, completedCount = 0, formatPrice }) {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card" style={{ borderLeft: '4px solid var(--color-status-pending)' }}>
          <div className="stat-info"><h3>Belum Diproses</h3><p>{pendingCount}</p></div>
          <span className="stat-icon"><ClockIcon /></span>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--color-status-processing)' }}>
          <div className="stat-info"><h3>Sedang Dibuat</h3><p>{processingCount}</p></div>
          <span className="stat-icon"><CookIcon /></span>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--color-status-completed)' }}>
          <div className="stat-info"><h3>Pesanan Selesai</h3><p>{completedCount}</p></div>
          <span className="stat-icon"><CheckIcon /></span>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div className="stat-info"><h3>Omzet Selesai</h3><p style={{ fontSize: '1.4rem' }}>{formatPrice(totalIncome)}</p></div>
          <span className="stat-icon"><CogIcon /></span>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3 className="analytics-card-title">Persentase Penyelesaian</h3>
          <div className="completed-rate-section">
            <div className="completed-rate-circle" style={{ background: `radial-gradient(closest-side, var(--color-bg-card) 79%, transparent 80% 100%), conic-gradient(var(--color-status-completed) ${Math.round((completedCount / (orders.length || 1)) * 100)}%, rgba(255, 255, 255, 0.05) 0)` }}>
              <span className="completed-rate-value">{Math.round((completedCount / (orders.length || 1)) * 100)}%</span>
            </div>
            <div className="rate-details">
              <h4>Penyelesaian Pesanan</h4>
              <p>{completedCount} dari {orders.length} Total Pesanan</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '500', marginTop: '6px' }}>Nilai Rata-rata Pesanan: {formatPrice(totalIncome / (completedCount || 1))}</p>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3 className="analytics-card-title">Menu Terlaris (Top 5)</h3>
          <div className="top-items-list">
            {topItems.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>Belum ada menu yang terjual dari pesanan selesai.</p>
            ) : (
              topItems.map((item, idx) => (
                <div key={idx} className="top-item-row-analytic">
                  <div className="top-item-info"><span>{item.name}</span><span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>{item.qty} porsi</span></div>
                  <div className="top-item-bar-bg"><div className="top-item-bar-fill" style={{ width: `${(item.qty / maxQty) * 100}%` }}></div></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
