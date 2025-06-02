import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  const rows = await sql.query('SELECT * FROM wallet');
  return NextResponse.json(rows);
}

export async function POST(req) {
  const body = await req.json();
  const { userId, walletName, amount } = body;
  const result = await sql.query(
    'INSERT INTO wallet (userId, walletName, amount) VALUES ($1, $2, $3) RETURNING *',
    [userId, walletName, amount]
  );
  return NextResponse.json(result, { status: 201 });
}