'use client';

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import { CartContext } from '@/context/cart-context';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);
  const router = useRouter(); // Inisialisasi router

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto py-8">Loading product details...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Error loading product details: {error.message}</div>;
  }

  if (!product) {
    return <div className="container mx-auto py-8">Product not found.</div>;
  }

  const handleAddToCartClick = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleGoBack = () => {
    router.back(); // Kembali ke halaman sebelumnya dalam riwayat browser
  };

  return (
    <div className="bg-white container mx-auto py-12">
      <button onClick={handleGoBack} className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-full">
        &lt;
      </button>
      <div className="bg-white rounded-lg overflow-hidden mt-12 md:mt-0"> 
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            {product.image && (
              <div className="relative w-full h-96">
                <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" className="rounded" />
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="text-xl text-yellow-600 mb-6 font-bold">Rp {product.price.toLocaleString('id-ID')}</div>
            <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>
            <div className="flex items-center space-x-4">
              <button
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md"
                onClick={handleAddToCartClick}
              >
                Add to cart
              </button>
              {product.stock > 0 ? (
                <span className="text-green-500 font-semibold">Stok Tersedia</span>
              ) : (
                <span className="text-red-500 font-semibold">Stok Habis</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}