import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("id");
  if (!user_id) {
    return NextResponse.json("Error! Missing User ID!", { status: 500 });
  }
  try {
    const response = await sql`SELECT * FROM v2.wallet WHERE user_id = ${user_id}`;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const { user_id, name, icon, amount } = await req.json();
  if (!user_id) {
    return NextResponse.json("Error! Missing User ID!", { status: 500 });
  }
  if (!name) {
    return NextResponse.json("Wallet Name required!", { status: 500 });
  }
  try {
    const response =
      await sql`INSERT INTO v2.wallet (user_id, name, icon, amount) 
    VALUES (${user_id}, ${name}, ${icon || null}, ${amount || 0})`;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
