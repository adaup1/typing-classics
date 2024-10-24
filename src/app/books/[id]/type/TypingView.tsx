import { styled } from "next-yak";
import { Book } from "@/app/lib/types";
import { CoverImage } from "@/app/components/images/CoverImage";
import { CharacterRenderer } from "./components/CharacterRenderer";

const TypingView = ({ bookData }: { bookData: Book }) => {
  const { text = "", cover_image_url = "", title_short } = bookData;

  return (
    <StyledContainer>
      <CoverImage
        className="coverImage"
        src={cover_image_url}
        alt={`Cover of ${title_short}`}
        title={`${bookData.title}`}
        author={`${bookData.author_first_name} ${bookData.author_last_name}`}
        width="18rem"
      />
      <div>
        <CharacterRenderer text={text} />
      </div>
    </StyledContainer>
  );
};

export default TypingView;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 1rem;

  @media (max-width: 1000px) {
    .coverImage {
      display: none;
    }
  }
`;
