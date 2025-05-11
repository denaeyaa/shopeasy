'use client';

import { CartProvider } from '@/context/cart-context';
import CartIndicator from '@/components/CartIndicator';

export default function CartProviderWrapper({ children }) {
  return (
    <CartProvider>
      {children}
      <CartIndicator />
    </CartProvider>
  );
}