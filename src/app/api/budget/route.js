import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// Utility to format dates to "YYYY-MM-DD"
function formatDateToYMD(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split("T")[0];
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const userId = "47c43f82-70b7-4d2c-9c38-4fc5276e03f2";

    let query = `SELECT b.* FROM budget b
      JOIN users_budget ub ON b.id = ub.budget_id
      WHERE ub.user_id = $1`;

    const params = [userId]
    if (id) {
      query += ` AND b.id = $2`;
      params.push(id)
    }

    const response = await sql.query(query, params);
    

    return NextResponse.json(response ?? [], { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, start, end } = body;
    const userId = "47c43f82-70b7-4d2c-9c38-4fc5276e03f2";
    const startFormatted = formatDateToYMD(start);
    const endFormatted = formatDateToYMD(end);
    const createdAt = formatDateToYMD(new Date());
    if (!name || !startFormatted || !endFormatted) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const response = await sql`
      INSERT INTO budget (name, start_date, end_date, created_at)
      VALUES (${name}, ${startFormatted}, ${endFormatted}, ${createdAt})
      RETURNING id
    `;
    const budgetId = response[0]?.id;
    if (!budgetId) {
      return NextResponse.json(
        { error: "Budget insertion failed" },
        { status: 500 }
      );
    }
    await sql`
      INSERT INTO users_budget (user_id, budget_id)
      VALUES (${userId}, ${budgetId})
    `;
    return NextResponse.json(
      { message: "Budget created successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
