import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const trId = searchParams.get("id")
  try {
    const userId = "1";
    let query = `SELECT * FROM v2.tracking_range WHERE user_id = $1`;
    const params = [ userId ]
    if(trId){
        query += ` AND id = $2`
        params.push(trId)
    }
    const response = await sql.query(query, params);
    return NextResponse.json(response ?? [], { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { user_id, start, end, name, goal } = await req.json();
  if (!user_id) {
    return NextResponse.json("Error! Missing User ID!", { status: 500 });
  }
  if (!name) {
    return NextResponse.json("Name required!", { status: 500 });
  }
  if (!start || !end) {
    return NextResponse.json("Date Range required!", { status: 500 });
  }
  try {
    const response = await sql.query(
      `INSERT INTO v2.tracking_range (user_id, start_date, end_date, name, goal) 
       VALUES ($1, $2, $3, $4, $5)`,
      [user_id, start, end, name, goal]
    );
    console.log(response);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
