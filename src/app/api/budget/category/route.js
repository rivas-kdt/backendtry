import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json("Error! ID required", { status: 404 });
  }
  const type = searchParams.get("type");
  try {
    let query = `SELECT * FROM budgets_category WHERE budget_id = $1`;
    const params = [id];
    if (type === "Income") {
      query += ` AND type = 'Income'`;
    } else if (type === "Expense") {
      query += ` AND type = 'Expense'`;
    }
    const response = await sql.query(query, params);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { budget_id, name, type, amount } = body;
    const response =
      await sql`INSERT INTO budgets_category (budget_id, name, type, budget_or_goal) VALUES ( ${budget_id}, ${name}, ${type}, ${amount})`;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
