import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE tc_books (
            book_id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            title_short VARCHAR(100),
            author_first_name VARCHAR(50),
            author_last_name VARCHAR(80),
            cover_image_url VARCHAR(2048),
            text TEXT
        );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
