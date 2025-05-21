import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const response = await sql.query(
      `SELECT * FROM budgets_category WHERE budget_id = $1`,
      [id]
    );

    const formattedResponse = await Promise.all(
      response.map(async (res) => {
        const transactions = await sql.query(
          `SELECT * FROM transaction WHERE category_id = $1`,
          [res.id]
        );
        return {
          category: res.name,
          type: res.type,
          goal_budget: res.budget_or_goal,
          transactions: transactions,
        };
      })
    );

    return NextResponse.json(formattedResponse, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
