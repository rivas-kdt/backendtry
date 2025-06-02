import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  const rows = await sql.query('SELECT * FROM budgets_category');
  return NextResponse.json(rows);
}

export async function POST(req) {
  const body = await req.json();
  const { rangeId, categoryId, name, planned, balance } = body;
  const result = await sql.query(
    'INSERT INTO budgets_category (rangeId, categoryId, name, planned, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [rangeId, categoryId, name, planned, balance]
  );
  return NextResponse.json(result, { status: 201 });
}