import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function POST(request) {
  try {
    const orderData = await request.json();

    // Di sini Anda akan melakukan validasi data orderData
    // Pastikan semua field yang dibutuhkan ada dan valid

    const { cartItems, shippingInfo, totalAmount } = orderData;

    if (!cartItems || cartItems.length === 0 || !shippingInfo || !totalAmount) {
      return NextResponse.json({ error: 'Data pesanan tidak lengkap' }, { status: 400 });
    }

    // Simpan data pesanan ke database
    const orderResult = await executeQuery(
      'INSERT INTO orders (order_date, total_amount, shipping_address, customer_name, customer_phone) VALUES (?, ?, ?, ?, ?)',
      [new Date(), totalAmount, shippingInfo.address, shippingInfo.name, shippingInfo.phone]
    );

    const orderId = orderResult.insertId;

    // Simpan detail item pesanan
    for (const item of cartItems) {
      await executeQuery(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.id, item.quantity, item.price, item.price * item.quantity]
      );
    }

    return NextResponse.json({ message: 'Pesanan berhasil dibuat!', orderId }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Gagal membuat pesanan' }, { status: 500 });
  }
}