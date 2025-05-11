'use client';

import AdminLayout from '@/components/AdminLayout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus pesanan dengan ID ${orderId}?`)) {
      try {
        const response = await fetch(`/api/admin/orders/${orderId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setOrders(orders.filter((order) => order.order_id !== orderId));
          alert(`Pesanan dengan ID ${orderId} berhasil dihapus.`);
        } else {
          const errorData = await response.json();
          alert(`Gagal menghapus pesanan dengan ID ${orderId}: ${errorData.error || 'Terjadi kesalahan'}`);
        }
      } catch (error) {
        console.error('Error menghapus pesanan:', error);
        alert(`Gagal menghapus pesanan dengan ID ${orderId}: Terjadi kesalahan jaringan.`);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div>Loading orders...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div>Error loading orders: {error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-xl font-semibold mb-4">Kelola Pesanan</h1>
      {orders.length > 0 ? (
        <div className="overflow-x-auto font-bold"> 
          <table className="min-w-full border-collapse border border-gray-300 text-sm"> 
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 sm:p-3">ID Pesanan</th>
                <th className="border border-gray-300 p-2 sm:p-3 hidden md:table-cell">Tanggal</th> 
                <th className="border border-gray-300 p-2 sm:p-3">Total</th>
                <th className="border border-gray-300 p-2 sm:p-3 hidden sm:table-cell">Status</th> 
                <th className="border border-gray-300 p-2 sm:p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 sm:p-3">{order.order_id}</td>
                  <td className="border border-gray-300 p-2 sm:p-3 hidden md:table-cell">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2 sm:p-3">Rp {order.total_amount.toLocaleString('id-ID')}</td>
                  <td className="border border-gray-300 p-2 sm:p-3 hidden sm:table-cell">{order.order_status || 'Pending'}</td>
                  <td className="border border-gray-300 p-2 sm:p-3 flex flex-wrap gap-1"> 
                    <Link
                      href={`/admin/orders/${order.order_id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs" 
                    >
                      Detail
                    </Link>
                    <button
                      onClick={() => handleDeleteOrder(order.order_id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs focus:outline-none focus:shadow-outline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Tidak ada pesanan.</div>
      )}
    </AdminLayout>
  );
}