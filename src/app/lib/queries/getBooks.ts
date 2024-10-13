import { sql } from "@vercel/postgres";
import get from "lodash/get";
import { SortOrder } from "../types.d";

interface GetBooksProps {
  limit: number;
  offset?: number;
  sortOrder?: SortOrder;
}

const ORDER_SQL_MAP = {
  titleAsc: "ORDER BY title ASC",
  titleDesc: "ORDER BY title DESC",
};

export const getBooks = async ({
  limit = 20,
  offset = 0,
  sortOrder = SortOrder.titleAsc,
}: GetBooksProps) => {
  const orderSql = ORDER_SQL_MAP[sortOrder];

  const books = await sql`
    SELECT book_id, title, author_first_name, author_last_name, cover_image_url
    FROM tc_books
    ${orderSql}
    LIMIT ${limit}
    OFFSET ${offset}
`;

  return get(books, "rows", []);
};
