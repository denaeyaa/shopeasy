'use client';

import { useContext, useState } from 'react';
import { CartContext } from '@/context/cart-context';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCheckout = async () => {
    setProcessing(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cartItems,
          shippingInfo: shippingInfo,
          totalAmount: totalAmount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}`);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Terjadi kesalahan saat membuat pesanan.');
      }
    } catch (error) {
      console.error('Error saat mengirim pesanan:', error);
      setErrorMessage('Gagal menghubungi server. Silakan coba lagi nanti.');
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8 text-gray-900">
        <h1 className="text-2xl font-bold mb-4 ml-4">Checkout</h1>
        <p className='ml-4'>Keranjang belanja kamu kosong</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 text-gray-900">
      <h1 className="text-2xl font-bold mb-6 ml-4">Checkout</h1>

      <div className="lg:flex lg:space-x-8">
        {/* Ringkasan Pesanan */}
        <div className="lg:w-1/2 mb-6 lg:mb-0 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="py-2 border-b last:border-b-0 sm:flex sm:justify-between">
                <div className="sm:flex-grow">
                  <span className="block sm:inline">{item.name}</span>
                  <span className="text-sm text-gray-600 ml-2">x {item.quantity}</span>
                </div>
                <span className="font-semibold sm:text-left">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </li>
            ))}
            <li className="flex justify-between font-semibold py-4 text-lg">
              <span>Total</span>
              <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
            </li>
          </ul>
        </div>

        {/* Informasi Pengiriman */}
        <div className="lg:w-1/2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Pengiriman</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nama:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Alamat:</label>
              <textarea
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3" // Tambahkan rows untuk tampilan awal yang lebih baik
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Nomor Telepon:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {/* Anda bisa menambahkan kolom lain seperti email jika diperlukan */}
          </div>
        </div>
      </div>

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}

      <button
        onClick={handleCheckout}
        className={`mt-6 bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded w-full sm:w-auto ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={processing}
      >
        {processing ? 'Memproses Pesanan...' : 'Selesaikan Pesanan'}
      </button>
    </div>
  );
}