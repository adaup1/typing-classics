import { getBookText } from "@/app/lib/data";
import TypingView from "./TypingView";

export default async function Type({ params }: { params: { id: string } }) {
  const id = params.id;
  const text = await getBookText({ bookId: id });

  return (
    <div>
      <TypingView text={text} />
    </div>
  );
}
