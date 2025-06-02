import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  const rows = await sql.query(`SELECT * FROM transaction t JOIN budgets_category bc ON t."budgetCategoryId"=bc."budgetCategoryId" JOIN category c ON c."categoryId"=bc."categoryId" JOIN wallet w ON w."walletId"=t."walletId"`);
  return NextResponse.json(rows, { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const { walletId, notes, date, amount, budgetCategoryId } = body;
  const result = await sql.query(
    "INSERT INTO transaction (walletId, notes, date, amount, budgetCategoryId) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [walletId, notes, date, amount, budgetCategoryId]
  );
  return NextResponse.json(result, { status: 201 });
}
