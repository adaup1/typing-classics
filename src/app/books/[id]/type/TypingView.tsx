import { styled } from "next-yak";
import { Book } from "@/app/lib/types";
import { CoverImage } from "@/app/components/images/CoverImage";
import { CharacterRenderer } from "./components/CharacterRenderer";

const TypingView = ({ bookData }: { bookData: Book }) => {
  const { text = "", cover_image_url = "", title_short } = bookData;

  return (
    <StyledContainer>
      <StyledCoverImageContainer className="coverImageContainer">
        <CoverImage
          src={cover_image_url}
          alt={`Cover of ${title_short}`}
          title={`${bookData.title}`}
          author={`${bookData.author_first_name} ${bookData.author_last_name}`}
          width="18rem"
        />
      </StyledCoverImageContainer>
      <div>
        <CharacterRenderer text={text} />
      </div>
    </StyledContainer>
  );
};

export default TypingView;

const StyledCoverImageContainer = styled.div`
  display: block;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 1rem;

  @media (max-width: 1300px) {
    ${StyledCoverImageContainer} {
      display: none;
    }
  }
`;
