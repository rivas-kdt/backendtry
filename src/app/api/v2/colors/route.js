import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL);

export async function GET(request) {
    const { searchParams } = new URL(request.url)
  try {
    const response = await sql.query(`SELECT * FROM v2.colors`);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
