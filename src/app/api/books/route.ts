import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import get from "lodash/get";

const ORDER_SQL_MAP = {
  titleAsc: "LOWER(title) ASC",
  titleDesc: "LOWER(title) DESC",
  lengthAsc: "word_count ASC",
  lengthDesc: "word_count DESC",
  authorAsc: "LOWER(author_last_name) ASC, LOWER(title) ASC",
  authorDesc: "LOWER(author_last_name) DESC, LOWER(title) DESC",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortOrder = searchParams.get("sortOrder") || "titleAsc";
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const q = searchParams.get("q") || "";

  const sortSqlString = ORDER_SQL_MAP[sortOrder];

  try {
    let result;
    if (q) {
      const query = `
        WITH matched_books AS (
          SELECT book_id, title, title_short, author_first_name, author_last_name, cover_image_url, word_count
          FROM tc_books
          WHERE to_tsvector('english', lower(title) || ' ' || lower(author_first_name) || ' ' || lower(author_last_name)) @@ phraseto_tsquery('english', lower($1))
        )
        SELECT 
          (SELECT COUNT(*) FROM matched_books) as total_count,
          book_id, title, title_short, author_first_name, author_last_name, cover_image_url, word_count
        FROM matched_books
        ORDER BY ${sortSqlString}
        LIMIT $2 OFFSET $3
      `;
      result = await sql.query(query, [q, limit, offset]);
    } else {
      const query = `
        WITH all_books AS (
          SELECT book_id, title, title_short, author_first_name, author_last_name, cover_image_url, word_count
          FROM tc_books
        )
        SELECT 
          (SELECT COUNT(*) FROM all_books) as total_count,
          book_id, title, title_short, author_first_name, author_last_name, cover_image_url, word_count
        FROM all_books
        ORDER BY ${sortSqlString}
        LIMIT $1 OFFSET $2
      `;
      result = await sql.query(query, [limit, offset]);
    }

    return NextResponse.json(
      {
        result: result.rows.map((row) => ({
          book_id: row.book_id,
          title: row.title,
          title_short: row.title_short,
          author_first_name: row.author_first_name,
          author_last_name: row.author_last_name,
          cover_image_url: row.cover_image_url,
          word_count: row.word_count,
        })),
        total: result.rows[0]?.total_count || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
