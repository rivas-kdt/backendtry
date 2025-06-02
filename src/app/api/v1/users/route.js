import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';


const sql = neon(process.env.DATABASE_URL);

export async function GET() {
    const rows = await sql.query('SELECT * FROM users');
    return NextResponse.json(rows);
}

export async function POST(req) {
    const body = await req.json();
    const { name, password } = body;
    const result = await sql.query(
        'INSERT INTO users (name, password, createdAt) VALUES ($1, $2, now()) RETURNING *',
        [name, password]
    );
    return NextResponse.json(result, { status: 201 });
}