import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const products = await executeQuery('SELECT id, name, slug, price, image FROM products');
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}