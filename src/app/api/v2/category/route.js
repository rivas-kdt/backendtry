import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("id");
  const type = searchParams.get("type");
  try {
    let query = `SELECT * FROM v2.category WHERE (user_id = $1 OR user_id IS NULL)`;
    const params = [uid];
    if (type) {
      query += ` AND type = $2`;
      params.push(type);
    }
    const response = await sql.query(query, params);
    console.log(response);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { user_id, name, type } = await req.json();
  if (!user_id) {
    return NextResponse.json("Error! Missing User ID!", { status: 500 });
  }
  if (!name) {
    return NextResponse.json("Category Name required!", { status: 500 });
  }
  if (!type) {
    return NextResponse.json("Category Name required!", { status: 500 });
  }
  try {
    const response =
      await sql`INSERT INTO v2.category (category, type, user_id) 
    VALUES (${name}, ${type}, ${user_id})`;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
