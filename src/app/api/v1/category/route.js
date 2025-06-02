import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  const rows = await sql.query('SELECT * FROM category');
  return NextResponse.json(rows);
}

export async function POST(req) {
  const body = await req.json();
  const { userId, name, type } = body;
  const result = await sql.query(
    'INSERT INTO category (userId, name, type) VALUES ($1, $2, $3) RETURNING *',
    [userId, name, type]
  );
  return NextResponse.json(result, { status: 201 });
}