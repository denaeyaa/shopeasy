import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await executeQuery('SELECT id AS order_id, order_date, total_amount, order_status FROM orders');
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}