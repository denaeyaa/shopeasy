'use client';

import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    console.log('Produk ditambahkan ke keranjang (context):', product.name);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    console.log('Produk dihapus dari keranjang:', productId);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      console.log('Jumlah produk diperbarui:', productId, newQuantity);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    console.log('Keranjang dikosongkan.');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};