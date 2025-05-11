'use client';

import AdminLayout from '@/components/AdminLayout';

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="p-4"> 
        <h1 className="text-2xl font-bold mb-4 pt-20">Dashboard Admin</h1>
        <p>Selamat datang di halaman administrasi toko mu!</p>
      </div>
    </AdminLayout>
  );
}