import { sql } from "@vercel/postgres";
import get from "lodash/get";

export const getTotalBooks = async () => {
  const book = await sql`
    SELECT count(book_id) AS count
    FROM tc_books
`;

  return get(book, ["rows", 0, "count"]);
};
