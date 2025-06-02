import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  const rows = await sql.query('SELECT * FROM budget_range');
  return NextResponse.json(rows);
}

export async function POST(req) {
  const body = await req.json();
  const { userId, startDate, endDate } = body;
  const result = await sql.query(
    'INSERT INTO budget_range (userId, startDate, endDate) VALUES ($1, $2, $3) RETURNING *',
    [userId, startDate, endDate]
  );
  return NextResponse.json(result, { status: 201 });
}