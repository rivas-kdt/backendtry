import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    let query = `SELECT b.id, b.name, b.description, b.amount, c.category, c.type, co.color FROM v2.budget b JOIN v2.category c ON c.id=b.category LEFT JOIN v2.colors co ON co.id=b.color WHERE range_id = $1`;
    const response = await sql.query(query, [id]);
    const totalAmount = await sql.query(`WITH tb1 as ( SELECT range_id, COALESCE(SUM(amount), 0) as income FROM v2.transaction WHERE type = 'income' GROUP BY range_id),
      tb2 as ( SELECT range_id, COALESCE(SUM(amount), 0) as expense FROM v2.transaction WHERE type = 'expense' GROUP BY range_id)
SELECT range_id, COALESCE(income, 0) as income, COALESCE(expense, 0) as expense FROM tb1 LEFT JOIN tb2 USING(range_id) WHERE range_id = $1`, [id])
console.log(totalAmount)
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { id } = await params;
  const { name, description, amount, category } = await request.json();
  const rangeId = Number(id);
  if (isNaN(rangeId)) {
    return NextResponse.json({ error: "Invalid range_id" }, { status: 400 });
  }
  try {
    const response = await sql.query(
      `INSERT INTO v2.budget (name, range_id, description, category, amount) 
       VALUES ($1, $2, $3, $4, $5)`,
      [name, rangeId, description, category, amount]
    );
    console.log(response);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
