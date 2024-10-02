import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export enum SortOrder {
  titleAsc = "titleAsc",
  titleDesc = "titleDesc",
}

const ORDER_SQL_MAP = {
  titleAsc: "title ASC",
  titleDesc: "title DESC",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortOrder = searchParams.get("sortOrder") || SortOrder.titleAsc;
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const q = searchParams.get("q") || "";

  const sortSqlString = ORDER_SQL_MAP[sortOrder];

  try {
    let result;
    if (q) {
      const query = `
        SELECT book_id, title, title_short, author_first_name, author_last_name, cover_image_url, word_count
        FROM tc_books
        WHERE to_tsvector('english', lower(title) || ' ' || lower(author_first_name) || ' ' || lower(author_last_name)) @@ phraseto_tsquery('english', lower($1))
        ORDER BY ${sortSqlString}
        LIMIT $2 OFFSET $3
      `;
      result = await sql.query(query, [q, limit, offset]);
    } else {
      const query = `
        SELECT book_id, title, title_short, author_first_name, author_last_name, cover_image_url, word_count
        FROM tc_books
        ORDER BY ${sortSqlString}
        LIMIT $1 OFFSET $2
      `;
      result = await sql.query(query, [limit, offset]);
    }

    return NextResponse.json({ result: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
