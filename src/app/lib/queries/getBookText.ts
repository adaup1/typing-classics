import { sql } from "@vercel/postgres";
import get from "lodash/get";

export const getBookText = async ({ bookId }: { bookId: string | number }) => {
  const book = await sql`
    SELECT text
    FROM tc_books
    WHERE book_id = ${bookId}
    LIMIT 1;
`;

  return get(book, ["rows", 0, "text"]);
};
