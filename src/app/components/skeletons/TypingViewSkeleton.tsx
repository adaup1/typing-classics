import { styled } from "css-template-components/server";
import { theme } from "@/app/theme";

const TypingViewSkeleton = () => {
  return (
    <StyledContainer>
      <StyledLeftContainer />
      <StyledCenterContainer />
      <StyledRightContainer />
    </StyledContainer>
  );
};

export default TypingViewSkeleton;

const StyledContainer = styled(
  "div",
  `
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-content: center;
  height: calc(100vh - 16rem);
  width: 100%;
`
);

const StyledCenterContainer = styled(
  "div",
  `
  max-width: 50vw;
  width: 64rem;
  height: 100%;
   border-radius: 0.5rem;
       filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
      animation: skeleton-loading 0.5s linear infinite alternate;

`
);

const StyledLeftContainer = styled(
  "div",
  `
  margin-left: 2rem;
  margin-right: 2rem;
  height: 2rem;
  width: 18rem;
   border-radius: 0.5rem;
       filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
       animation: skeleton-loading 0.5s linear infinite alternate;

  `
);

const StyledRightContainer = styled(
  "div",
  `
    margin-left: 2rem;
    margin-right: 2rem;
    height: 2rem;
      border-radius: 0.5rem;
    width: 18rem;
        filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
       animation: skeleton-loading 0.5s linear infinite alternate;

  `
);
