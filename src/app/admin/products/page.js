'use client';

import AdminLayout from '@/components/AdminLayout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk dengan ID ${productId}?`)) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setProducts(products.filter((product) => product.id !== productId));
          alert(`Produk dengan ID ${productId} berhasil dihapus.`);
        } else {
          const errorData = await response.json();
          alert(`Gagal menghapus produk dengan ID ${productId}: ${errorData.error || 'Terjadi kesalahan'}`);
        }
      } catch (error) {
        console.error('Error menghapus produk:', error);
        alert(`Gagal menghapus produk dengan ID ${productId}: Terjadi kesalahan jaringan.`);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div>Memuat daftar produk...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div>Error memuat produk: {error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="pt-15">
      <h1 className="text-xl font-semibold mb-4">Kelola Produk</h1>
      <div className="overflow-x-auto font-bold">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md text-sm">
          <thead className="bg-gray-100 font-bold"> {/* Terapkan font-bold di sini */}
            <tr>
              <th className="py-2 px-3 border-b sm:py-3 sm:px-4">ID</th>
              <th className="py-2 px-3 border-b sm:py-3 sm:px-4">Nama</th>
              <th className="py-2 px-3 border-b sm:py-3 sm:px-4">Harga</th>
              <th className="py-2 px-3 border-b sm:py-3 sm:px-4 hidden md:table-cell">Stok</th>
              <th className="py-2 px-3 border-b sm:py-3 sm:px-4 hidden sm:table-cell">Gambar</th>
              <th className="py-2 px-3 border-b sm:py-3 sm:px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border-b sm:py-3 sm:px-4">{product.id}</td>
                <td className="py-2 px-3 border-b sm:py-3 sm:px-4">{product.name}</td>
                <td className="py-2 px-3 border-b sm:py-3 sm:px-4">Rp {product.price.toLocaleString('id-ID')}</td>
                <td className="py-2 px-3 border-b sm:py-3 sm:px-4 hidden md:table-cell">{product.stock}</td>
                <td className="py-2 px-3 border-b sm:py-3 sm:px-4 hidden sm:table-cell">
                  {product.image && (
                    <div className="relative w-16 h-16">
                      <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded" />
                    </div>
                  )}
                </td>
                <td className="py-2 px-3 border-b sm:py-3 sm:px-4">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs focus:outline-none focus:shadow-outline whitespace-nowrap"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/admin/products/add" className="inline-block mt-4 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Tambah Produk Baru
      </Link>
      </div>
    </AdminLayout>
  );
}