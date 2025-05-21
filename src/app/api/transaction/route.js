import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  try {
    const id = 2;
    let data;
    if (query === "full") {
      const response =
        await sql`SELECT b.name, b.start_date, b.end_date, t.description, t.type, c.name as category, t.amount, t.date FROM transaction t JOIN budgets_transaction bt ON t.id=bt.transaction_id JOIN budget b ON b.id=bt.budget_id JOIN category c ON t.category=c.id WHERE bt.budget_id = ${id}`;
      data = response;
    } else {
      const sql = neon(process.env.DATABASE_URL);
      const response =
        await sql`SELECT t.* FROM transaction t JOIN budgets_transaction bt ON t.id=bt.transaction_id WHERE bt.budget_id = ${id}`;
      data = response;
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST() {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const response = await sql`
      INSERT INTO transaction (description, type, date, amount, category, created_at)
      VALUES ('Transpo', 'Expense', '2025-05-14', 3000, 1, '2025-05-19')
      RETURNING id`;

    const id = response[0].id;
    const response2 = await sql`
      INSERT INTO budgets_transaction (budget_id, transaction_id)
      VALUES (2, ${id})`;

    if (!response2) {
      return NextResponse.json({ error: "Insertion failed" }, { status: 404 });
    }

    return NextResponse.json({ id: id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
