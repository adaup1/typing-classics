import { getBookText, getBook } from "@/app/lib/data";
import TypingView from "./TypingView";

export default async function Type({ params }: { params: { id: string } }) {
  const id = params.id;
  const bookData = await getBook({ bookId: id });

  return (
    <div>
      <TypingView bookData={bookData} />
    </div>
  );
}
