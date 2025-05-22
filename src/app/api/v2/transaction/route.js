import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const { name, notes, date, id, amount, category, from, to, budget_id } =
    await request.json();

  try {
    if (type === "income") {
      const response = await sql.query(
        `INSERT INTO v2.transaction (name, notes, amount, t_date, range_id, category, type, "to")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [name, notes, amount, date, id, category, "income", to]
      );

      const transaction = response[0];

      await sql.query(
        `UPDATE v2.wallet SET amount = amount + $1 WHERE id = $2`,
        [transaction.amount, to]
      );

      return NextResponse.json(response[0], { status: 200 });
    }

    if (type === "expense") {
      const response = await sql.query(
        `INSERT INTO v2.transaction (name, notes, amount, t_date, range_id, category, type, "from")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [name, notes, amount, date, id, category, "expense", from]
      );
      const transactionId = response[0].id;

      if (budget_id) {
        await sql.query(
          `INSERT INTO v2.budgets_transaction (budget_id, transaction_id)
           VALUES ($1, $2)`,
          [budget_id, transactionId]
        );
      }

      return NextResponse.json({ id: transactionId }, { status: 200 });
    }

    if (type === "transfer") {
      const response = await sql.query(
        `INSERT INTO v2.transaction (name, notes, amount, t_date, range_id, category, type, "from", "to")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [name, notes, amount, date, id, category, "transfer", from, to]
      );

      const transaction = response[0];

      await sql.query(
        `UPDATE v2.wallet SET amount = amount - $1 WHERE id = $2`,
        [transaction.amount, from]
      );

      await sql.query(
        `UPDATE v2.wallet SET amount = amount + $1 WHERE id = $2`,
        [transaction.amount, to]
      );

      return NextResponse.json(response[0], { status: 200 });
    }

    return NextResponse.json(
      { error: "Invalid transaction type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Transaction POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
