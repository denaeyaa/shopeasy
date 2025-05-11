'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 ml-4 text-gray-900">Shopeasy</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-900">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-md p-4 hover:shadow-lg hover:border-yellow-700 hover:scale-105 transition-all duration-200">
            {product.image && (
              <div className="relative w-full h-48 mb-2">
                <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-md" />
              </div>
            )}
            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <p className="text-yellow-600 mb-2 font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
            <Link href={`/products/${product.slug}`} key={product.id} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded block text-center">
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}