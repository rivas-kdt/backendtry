import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    let query = `SELECT b.id, b.name, b.description, b.amount, c.category, c.type FROM v2.budget b JOIN v2.category c ON c.id=b.category WHERE range_id = $1`;
    const response = await sql.query(query, [id]);
    return NextResponse.json(response ?? [], { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { id } = params;
  const { name, description, amount, category } = await request.json();
  try {
    const response = await sql.query(
      `INSERT INTO v2.budget (name, range_id, description, category, amount) 
       VALUES ($1, $2, $3, $4, $5)`,
      [name, id, description, category, amount]
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
