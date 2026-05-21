import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar({ tableNumber, onOpenScanner }) {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-logo">🍽️</span>
          <span className="navbar-title">QuickOrder</span>
          {tableNumber ? (
            <div className="navbar-table" id="table-indicator" onClick={onOpenScanner} style={{ cursor: 'pointer' }}>
              <span className="navbar-table-icon">📍</span>
              Meja {tableNumber} (Ubah)
            </div>
          ) : (
            <div className="navbar-table" id="table-indicator" onClick={onOpenScanner} style={{ background: 'rgba(251, 191, 36, 0.12)', color: 'var(--color-warning)', cursor: 'pointer' }}>
              <span className="navbar-table-icon">⚠️</span>
              Perlu scan QR Code
            </div>
          )}
        </div>

        <div className="navbar-actions">
          {onOpenScanner && (
            <button
              className="btn-scanner-trigger-nav"
              onClick={onOpenScanner}
              title="Pindai QR Code Meja"
              aria-label="Scan QR Code Meja"
            >
              📷 <span className="nav-scan-text">Scan Meja</span>
            </button>
          )}
          <button
            className="cart-button"
            id="cart-nav-button"
            onClick={() => navigate(`/cart${tableNumber ? `?meja=${tableNumber}` : ''}`)}
            aria-label="Keranjang belanja"
          >
            🛒
            {totalItems > 0 && (
              <span className="cart-badge" key={totalItems}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
