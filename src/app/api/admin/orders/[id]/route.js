import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const orderDetails = await executeQuery(
      `SELECT o.id AS order_id,
              o.order_date,
              o.total_amount,
              o.order_status,
              o.customer_name,
              o.customer_phone,
              o.shipping_address,
              oi.product_id,
              oi.quantity,
              oi.unit_price,
              oi.subtotal,
              p.name AS product_name
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       WHERE o.id = ?`,
      [id]
    );

    if (!orderDetails || orderDetails.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Strukturkan data agar item pesanan berada dalam satu objek pesanan
    const formattedOrder = orderDetails.reduce((acc, row) => {
      if (!acc.order_id) {
        acc = {
          order_id: row.order_id,
          order_date: row.order_date,
          total_amount: row.total_amount,
          order_status: row.order_status,
          customer_name: row.customer_name,
          customer_phone: row.customer_phone,
          shipping_address: row.shipping_address,
          order_items: [],
        };
      }
      acc.order_items.push({
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        unit_price: row.unit_price,
        subtotal: row.subtotal,
      });
      return acc;
    }, {});

    return NextResponse.json(formattedOrder);
  } catch (error) {
    console.error('Error fetching order details with customer and product info:', error);
    return NextResponse.json({ error: 'Failed to fetch order details with customer and product info' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    // Hapus item pesanan terlebih dahulu
    await executeQuery('DELETE FROM order_items WHERE order_id = ?', [id]);

    // Kemudian hapus pesanan
    const result = await executeQuery('DELETE FROM orders WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: `Pesanan dengan ID ${id} berhasil dihapus` });
    } else {
      return NextResponse.json({ error: `Pesanan dengan ID ${id} tidak ditemukan` }, { status: 404 });
    }
  } catch (error) {
    console.error('Error menghapus pesanan:', error);
    return NextResponse.json({ error: 'Gagal menghapus pesanan' }, { status: 500 });
  }
}