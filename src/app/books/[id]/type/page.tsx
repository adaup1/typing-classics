import { getBook } from "@/app/lib/queries/getBook";
import dynamic from "next/dynamic";
import TypingViewSkeleton from "@/app/components/server/skeletons/TypingViewSkeleton";

const TypingView = dynamic(() => import("./TypingView"), {
  ssr: false,
  loading: () => <TypingViewSkeleton />,
});

export default async function Type({ params }: { params: { id: string } }) {
  const id = params.id;
  const bookData = await getBook({ bookId: id });

  return <TypingView bookData={bookData} />;
}
