import { styled, keyframes } from "next-yak";
import { theme } from "@/app/theme";

const TypingViewSkeleton = () => {
  return (
    <StyledContainer>
      <StyledLeftContainer />
      <StyledMainContent>
        <StyledMobileStats />
        <StyledCenterContainer />
      </StyledMainContent>
      <StyledRightContainer />
    </StyledContainer>
  );
};

export default TypingViewSkeleton;

const loading = keyframes`
  0% {
    background-color: #1f1f40;
  }
  100% {
    background-color: #2f2e5f;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-content: center;
  height: calc(100vh - 16rem);
  width: 100%;
`;

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledMobileStats = styled.div`
  display: none;
  height: 4rem;
  width: calc(100vw - 1rem);
  border-radius: 0.5rem;
  filter: drop-shadow(0 0 0.5rem ${() => theme.gray});
  animation: ${loading} 0.5s linear infinite alternate;

  @media (max-width: 1000px) {
    display: block;
  }
`;

const StyledCenterContainer = styled.div`
  max-width: 50vw;
  width: 64rem;
  height: 100%;
  border-radius: 0.5rem;
  filter: drop-shadow(0 0 0.5rem ${() => theme.gray});
  animation: ${loading} 0.5s linear infinite alternate;

  @media (max-width: 1000px) {
    max-width: none;
    width: calc(100vw - 1rem);
  }
`;

const StyledLeftContainer = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  height: 28rem;
  width: 18rem;
  border-radius: 0.5rem;
  filter: drop-shadow(0 0 0.5rem ${() => theme.gray});
  animation: ${loading} 0.5s linear infinite alternate;

  @media (max-width: 1300px) {
    display: none;
  }
`;

const StyledRightContainer = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  height: 28rem;
  border-radius: 0.5rem;
  width: 18rem;
  filter: drop-shadow(0 0 0.5rem ${() => theme.gray});
  animation: ${loading} 0.5s linear infinite alternate;

  @media (max-width: 1000px) {
    display: none;
  }
`;
