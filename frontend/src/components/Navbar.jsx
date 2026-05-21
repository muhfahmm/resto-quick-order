import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar({ tableNumber }) {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-logo">🍽️</span>
          <span className="navbar-title">QuickOrder</span>
          {tableNumber ? (
            <div className="navbar-table" id="table-indicator">
              <span className="navbar-table-icon">📍</span>
              Meja {tableNumber}
            </div>
          ) : (
            <div className="navbar-table" id="table-indicator" style={{ background: 'rgba(251, 191, 36, 0.12)', color: 'var(--color-warning)' }}>
              <span className="navbar-table-icon">⚠️</span>
              Perlu scan QR Code
            </div>
          )}
        </div>

        <div className="navbar-actions">
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
