import { sql } from "@vercel/postgres";
import get from "lodash/get";

export const getHotBooks = async () => {
  const books = await sql`
    SELECT book_id, title, title_short, author_first_name, author_last_name, cover_image_url, word_count
    FROM tc_books
    LIMIT 10
`;

  return get(books, "rows", []);
};
