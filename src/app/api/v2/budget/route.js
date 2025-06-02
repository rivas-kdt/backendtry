import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
  const body = await req.json();
  const { name, start, end, amount } = body;
  const result = await sql.query(
    "INSERT INTO budget (budget_name, start_date, end_date, initial_balance) VALUES ($1, $2, $3, $4) RETURNING id",
    [name, start, end, amount]
  );
  return NextResponse.json(result, { status: 201 });
}
