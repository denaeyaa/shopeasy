import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const product = await executeQuery(
      'SELECT * FROM products WHERE slug = ?',
      [slug]
    );

    console.log("Hasil query detail produk:", product); // Tambahkan baris ini

    if (!product || product.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product[0]);
  } catch (error) {
    console.error('Error fetching product details:', error);
    return NextResponse.json({ error: 'Failed to fetch product details' }, { status: 500 });
  }
}