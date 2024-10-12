import { BooksSort } from "./components/BooksSort";
import { getTotalBooks } from "../lib/queries/getTotalBooks";

export default async function Book() {
  const totalBooks = await getTotalBooks();

  return (
    <div>
      <BooksSort totalBooks={totalBooks} />
    </div>
  );
}
