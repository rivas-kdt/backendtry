import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const rID = searchParams.get('id')
  try {
    let query = `SELECT b.id, b.description, b.amount, c.category FROM v2.budget b JOIN v2.category c ON c.id=b.tr_category WHERE range_id = $1`;
    const response = await sql.query(query, [rID]);
    return NextResponse.json(response ?? [], { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}