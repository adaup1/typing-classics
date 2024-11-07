import { StyledContainer, StyledH1 } from "./styled";
import { theme } from "@/app/theme";
import { styled } from "next-yak";

const TEXT = "Books at Your Fingertips";

const HeadingSkeleton = () => {

  return (
    <StyledOuterContainer >
      <StyledContainer>
        <StyledH1>{TEXT}</StyledH1>
      </StyledContainer>
    </StyledOuterContainer>
  );
};

export default HeadingSkeleton;


const StyledOuterContainer = styled.div`
  color: ${()=> theme.darkerPurple};
  cursor: default;

  @media (max-width: 1000px) {
    color: ${()=> theme.white};
  }
`;
