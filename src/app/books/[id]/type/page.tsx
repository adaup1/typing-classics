import { getBook } from "@/app/lib/queries/getBook";
import dynamic from "next/dynamic";
import TypingViewSkeleton from "@/app/components/skeletons/TypingViewSkeleton";
import { notFound } from "next/navigation";

const TypingView = dynamic(() => import("./TypingView"), {
  ssr: false,
  loading: () => <TypingViewSkeleton />,
});

export default async function Type({ params }: { params: { id: string } }) {
  const id = params.id;
  const bookData = await getBook({ bookId: id });

  if (!bookData) {
    notFound();
  }

  return <TypingView bookData={bookData} />;
}
