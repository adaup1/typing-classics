import { sql } from "@vercel/postgres";
import get from "lodash/get";

const minimizeString = (input: string) => {
  return input
    .replace(/\s+/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
};

export const upgradeBookText = async () => {
  const bookCount = await sql`
    SELECT count(book_id)
    FROM tc_books;
  `;

  const count = get(bookCount, ["rows", 0, "count"]);
  for (let i = 1; i <= count; i++) {
    const book = await sql`
        SELECT text 
        FROM tc_books
        WHERE book_id = ${i};
    `;
    const bookText = get(book, ["rows", 0, "text"]);

    if (bookText) {
      const newText = minimizeString(bookText);

      await sql`
          UPDATE tc_books
          SET text = ${newText}
          WHERE book_id = ${i}
      `;
      console.log(`Updated text for book_id ${i}`);
    }
  }
};
