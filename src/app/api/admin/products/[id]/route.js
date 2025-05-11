import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID produk tidak valid' }, { status: 400 });
  }

  try {
    const result = await executeQuery('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: `Produk dengan ID ${id} berhasil dihapus` }, { status: 200 });
    } else {
      return NextResponse.json({ error: `Produk dengan ID ${id} tidak ditemukan` }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 });
  }
}