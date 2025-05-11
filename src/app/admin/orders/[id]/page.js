'use client';

import AdminLayout from '@/components/AdminLayout';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/admin/orders/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrder(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div>Loading order details for ID: {id}</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div>Error loading order details: {error}</div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div>Order not found.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-xl font-semibold mb-4">Detail Pesanan #{order.order_id}</h1>

      <div className="mb-4">
        <strong>Tanggal Pemesanan:</strong> {new Date(order.order_date).toLocaleDateString()}
      </div>
      <div className="mb-4">
        <strong>Status Pesanan:</strong> {order.order_status || 'Pending'}
      </div>
      <div className="mb-4">
        <strong>Informasi Pelanggan:</strong>
        <p>Nama: {order.customer_name}</p>
        <p>Telepon: {order.customer_phone}</p>
        <p>Alamat: {order.shipping_address}</p>
      </div>

      <div>
        <strong>Item yang Dipesan:</strong>
        {order.order_items && order.order_items.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Produk ID</th>
                <th className="border border-gray-300 p-2">Nama Produk</th>
                <th className="border border-gray-300 p-2">Kuantitas</th>
                <th className="border border-gray-300 p-2">Harga Satuan</th>
                <th className="border border-gray-300 p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.order_items.map((item) => (
                <tr key={item.product_id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{item.product_id}</td>
                  <td className="border border-gray-300 p-2">{item.product_name}</td>
                  <td className="border border-gray-300 p-2">{item.quantity}</td>
                  <td className="border border-gray-300 p-2">Rp {item.unit_price.toLocaleString('id-ID')}</td>
                  <td className="border border-gray-300 p-2">Rp {item.subtotal.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Tidak ada item dalam pesanan ini.</p>
        )}
      </div>
    </AdminLayout>
  );
}