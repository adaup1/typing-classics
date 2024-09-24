import { getBookText, getBook } from "@/app/lib/data";
import dynamic from "next/dynamic";
import { styled } from "css-template-components/server";
import TypingViewSkeleton from "@/app/components/skeletons/TypingViewSkeleton";

const TypingView = dynamic(() => import("./TypingView"), {
  ssr: false,
  loading: () => <TypingViewSkeleton />,
});

export default async function Type({ params }: { params: { id: string } }) {
  const id = params.id;
  const bookData = await getBook({ bookId: id });

  return (
    <div>
      <TypingView bookData={bookData} />
      <StyledTest>Hi there</StyledTest>
    </div>
  );
}

const StyledTest = styled(
  "div",
  `
  background: green;
  height: 1rem;
  width: 100%;
`
);
