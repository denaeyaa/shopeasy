'use client';

import { CartContext } from '@/context/cart-context';
import { useContext } from 'react';
import { TiShoppingCart } from "react-icons/ti";
import Link from 'next/link';

export default function CartIndicator() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center">
      <Link href="/cart" className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 flex items-center transition-colors duration-200">
        <span className="font-bold text-black mr-4">CART</span>
        <TiShoppingCart size={23} className="mr-0.5 text-black" />
        {totalItems > 0 && (
          <div className="absolute -top-1 -right-0.5 bg-yellow-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold">
            {totalItems}
          </div>
        )}
      </Link>
    </div>
  );
}