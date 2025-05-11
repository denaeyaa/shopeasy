import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

export async function GET() {
  try {
    const products = await executeQuery('SELECT * FROM products');
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const stock = formData.get('stock');
    const imageFile = formData.get('image');

    let imageName = null;
    if (imageFile) {
    imageName = `/images/${imageName}`;
    }

    // Generate slug from product name
    const slug = slugify(name, { lower: true });

    const result = await executeQuery(
      'INSERT INTO products (name, description, price, stock, image, slug) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, imageName, slug]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: 'Produk berhasil ditambahkan' }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Gagal menyimpan produk ke database' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Gagal menambahkan produk' }, { status: 500 });
  }
}