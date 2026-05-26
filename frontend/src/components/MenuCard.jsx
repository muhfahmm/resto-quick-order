import { useCart } from '../context/CartContext';
import { getMenuImage, formatPrice } from '../services/api';

function MenuCard({ item }) {
  const { addToCart, decreaseQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(item.id);
  const imageSrc = getMenuImage(item.image_url);

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
                  onClick={() => addToCart(item)}
                  aria-label={`Tambah ${item.name}`}
                >
                  +
                </button>
              ) : (
                <div className="qty-control" id={`qty-control-${item.id}`}>
                  <button
                    className="qty-btn minus"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Kurangi"
                  >
                    −
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn plus"
                    onClick={() => addToCart(item)}
                    aria-label="Tambah"
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

export default MenuCard;
