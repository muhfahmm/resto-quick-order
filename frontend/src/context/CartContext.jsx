import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Menambahkan item ke keranjang
  const addToCart = useCallback((item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  // Mengurangi kuantitas item
  const decreaseQuantity = useCallback((itemId) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity === 1) {
        return prev.filter(i => i.id !== itemId);
      }
      return prev.map(i =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }, []);

  // Menghapus item dari keranjang
  const removeFromCart = useCallback((itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  // Mengosongkan keranjang
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Mendapatkan kuantitas item tertentu
  const getItemQuantity = useCallback((itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  // Menghitung total item di keranjang
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Menghitung total harga
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    totalItems,
    totalPrice,
  }), [cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, getItemQuantity, totalItems, totalPrice]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart harus digunakan di dalam CartProvider');
  }
  return context;
}

export default CartContext;
