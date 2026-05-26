import { memo } from 'react';
import { useCart } from '../context/CartContext';
import { getMenuImage, formatPrice } from '../services/api';

function MenuCard({ item, onInteract }) {
  const { addToCart, decreaseQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(item.id);
  const imageSrc = getMenuImage(item.image_url);

  const handleAddClick = () => {
    if (onInteract) onInteract();
    addToCart(item);
  };

  const handleDecreaseClick = () => {
    if (onInteract) onInteract();
    decreaseQuantity(item.id);
  };

  return (
    <div className="menu-card" id={`menu-item-${item.id}`}>
      <div className="menu-card-image">
        <img
          src={imageSrc}
          alt={item.name}
          loading="lazy"
        />
        {!item.is_available && (
          <div className="menu-card-unavailable">Habis</div>
        )}
      </div>

      <div className="menu-card-body">
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-footer">
          <span className="menu-card-price">{formatPrice(item.price)}</span>

          {item.is_available ? (
            <>
              {quantity === 0 ? (
                <button
                  className="add-button"
                  id={`add-btn-${item.id}`}
                  onClick={handleAddClick}
                  aria-label={`Tambah ${item.name}`}
                  type="button"
                >
                  +
                </button>
              ) : (
                <div className="qty-control" id={`qty-control-${item.id}`}>
                  <button
                    className="qty-btn minus"
                    onClick={handleDecreaseClick}
                    aria-label="Kurangi"
                    type="button"
                  >
                    −
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn plus"
                    onClick={handleAddClick}
                    aria-label="Tambah"
                    type="button"
                  >
                    +
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="menu-card-badge-habis">HABIS</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(MenuCard);
