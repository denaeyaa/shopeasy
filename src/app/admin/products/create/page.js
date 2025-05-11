'use client';

import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function AdminCreateProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Produk berhasil ditambahkan!');
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        fetchProducts();
      } else {
        const errorData = await response.json();
        alert(`Gagal menambahkan produk: ${errorData.error || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error('Error menambahkan produk:', error);
      alert('Gagal menambahkan produk: Terjadi kesalahan jaringan.');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      window.location.reload();
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-semibold mb-4">Tambah Produk Baru</h1>
      <Link href="/admin/products" className="inline-block mb-4 text-blue-500 hover:underline font-semibold text-l bg-gray-200 rounded">
        &lt;
      </Link>

      <div>
        <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Produk
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Nama Produk"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Deskripsi
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Deskripsi Produk"
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Harga
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Harga Produk"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              Stok
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stock"
              type="number"
              placeholder="Jumlah Stok"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Gambar Produk
            </label>
            <div className="relative border rounded w-full py-2 px-3 bg-gray-100 flex items-center justify-between">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                onClick={handleChooseFileClick}
              >
                Pilih File
              </button>
              <span className="text-gray-600 text-sm ml-2 truncate">
                {image ? image.name : 'Tidak ada file dipilih'}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                className="absolute w-0 h-0 opacity-0"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}