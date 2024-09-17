import { sql } from "@vercel/postgres";
import get from "lodash/get";
import { Book } from "./types.d";

export const getBookText = async ({ bookId }: { bookId: string | number }) => {
  const book = await sql`
    SELECT text
    FROM tc_books
    WHERE book_id = ${bookId}
    LIMIT 1;
`;

  return get(book, ["rows", 0, "text"]);
};

export const getBook = async ({ bookId }: { bookId: string | number }) => {
  const book = await sql`
    SELECT *
    FROM tc_books
    WHERE book_id = ${bookId}
    LIMIT 1;
`;

  return get(book, ["rows", 0]);
};
