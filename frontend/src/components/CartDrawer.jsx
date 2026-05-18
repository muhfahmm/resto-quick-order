import React from 'react';

export default function CartDrawer({ cartItems, onRemove, onCheckout }) {
  return (
    <div className="cart-drawer">
      <h2>Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} x {item.qty}
              <button onClick={() => onRemove(item.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onCheckout} disabled={cartItems.length === 0}>
        Pesan & Bayar QRIS
      </button>
    </div>
  );
}
