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

    let total;
    if (q) {
      const query = `
        SELECT count(book_id)
        FROM tc_books
        WHERE to_tsvector('english', lower(title) || ' ' || lower(author_first_name) || ' ' || lower(author_last_name)) @@ phraseto_tsquery('english', lower($1))
      `;
      total = await sql.query(query, [q]);
    } else {
      const query = `
        SELECT count(book_id)
        FROM tc_books
      `;
      total = await sql.query(query, []);
    }

    return NextResponse.json(
      { result: result.rows, total: get(total, ["rows", 0, "count"], 0) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const api_key = get(searchParams, "api_key");
  const api_token = get(searchParams, "api_token");

  if (api_key && api_token) {
    try {
      const admin = await sql`
      SELECT admin_id
      FROM tc_admins
      WHERE api_key = ${api_key}
      AND api_token = ${api_token}
      LIMIT 1;
    `;

      if (admin.rows.length > 0) {
        const text = get(searchParams, "text");
        const book_id = get(searchParams, "book_id");

        if (!text || !book_id) {
          return NextResponse.json(
            { Parameter_Error: "text and book_id required" },
            { status: 401 }
          );
        }
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  return NextResponse.json(
    { Parameter_Error: "api_key and api_token required" },
    { status: 401 }
  );
}
