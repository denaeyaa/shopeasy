'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/cart-context';
import Image from 'next/image';
import Link from 'next/link'; 

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8 text-gray-900">
        <h1 className="text-2xl font-bold mb-4 ml-4">Keranjang</h1>
        <p className='ml-4'>Keranjang belanja kamu masih kosong nih</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 text-gray-900">
      <h1 className="text-2xl font-bold mb-4 ml-6">Keranjang</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr className="sm:table-row hidden"> 
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Produk</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Harga</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Jumlah</th>
              <th className="py-3 px-6 text-right font-semibold text-gray-700">Total</th>
              <th className="py-3 px-6 text-right font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b sm:table-row flex-col sm:flex-row"> 
                <td className="py-4 px-6 flex items-center text-gray-900 sm:table-cell font-semibold">
                  {item.image && (
                    <div className="relative w-16 h-16 mr-4">
                      <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded-md" />
                    </div>
                  )}
                  <span className="block sm:inline">{item.name}</span> 
                </td>
                <td className="py-4 px-6 text-gray-900 sm:table-cell block sm:table-cell text-left sm:text-left text-sm font-semibold"> 
                  <span className="sm:hidden block mb-1 font-semibold">Harga:</span>
                  Rp {item.price.toLocaleString('id-ID')}
                </td>
                <td className="py-4 px-6 sm:table-cell block sm:table-cell text-left sm:text-left text-sm font-semibold"> 
                  <span className="sm:hidden block mb-1 font-semibold">Jumlah:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-2 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-2 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                </td>
                <td className="py-4 px-6 text-right text-gray-900 sm:table-cell block sm:table-cell text-left sm:text-right text-sm font-semibold"> 
                  <span className="sm:hidden block mb-1 font-semibold">Total:</span>
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </td>
                <td className="py-4 px-6 text-right sm:table-cell block sm:table-cell text-left sm:text-right text-sm"> 
                  <span className="sm:hidden block mb-1 font-semibold">Aksi:</span>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => removeFromCart(item.id)}
                  >Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-right text-gray-900">
        <p className="text-xl font-semibold mb-4">
          Total : Rp {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('id-ID')}
        </p>
        <Link href="/checkout" className="bg-gray-900 hover:bg-gray-700 text-white font-bold text-s py-1.5 px-3 rounded-md inline-block">
          Checkout
        </Link>
      </div>
    </div>
  );
}