import { styled } from "css-template-components/server";
import { Book } from "@/app/lib/types";
import { CoverImage } from "@/app/components/server/images/CoverImage";
import dynamic from "next/dynamic";
import { CharacterRenderer } from "./components/CharacterRenderer";

const TypingView = ({ bookData }: { bookData: Book }) => {
  const { text = "", cover_image_url = "", title_short } = bookData;

  return (
    <StyledContainer>
      <CoverImage
        className="coverImage"
        src={cover_image_url}
        alt={`Cover of ${title_short}`}
      />
      <div>
        <CharacterRenderer text={text} />
      </div>
    </StyledContainer>
  );
};

export default TypingView;

const StyledContainer = styled(
  "div",
  `
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 1rem;

  
  @media (max-width: 1000px) {
    .coverImage {
      display: none;
    }
  }
`
);
