import { styled } from "css-template-components/server";
import { Book } from "@/app/lib/types";
import { CoverImage } from "@/app/components/images/CoverImage";
import dynamic from "next/dynamic";
import { CharacterRenderer } from "./components/CharacterRenderer";

const TypingView = ({ bookData }: { bookData: Book }) => {
  const { text = "", cover_image_url = "", title_short } = bookData;

  return (
    <>
      <CharacterRenderer text={text} />
    </>
  );
};

export default TypingView;
