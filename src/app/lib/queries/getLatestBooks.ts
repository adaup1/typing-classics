import { sql } from "@vercel/postgres";
import get from "lodash/get";

export const getLatestBooks = async () => {
  const books = await sql`
    SELECT book_id, title, title_short, author_first_name, author_last_name, cover_image_url, word_count
    FROM tc_books
    ORDER BY book_id DESC
    LIMIT 10
`;

  return get(books, "rows", []);
};
