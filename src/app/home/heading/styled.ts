import { styled, keyframes } from "next-yak";
import { robotoMono } from "../../theme/fonts";

export const StyledTextContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export const StyledH1 = styled.h1`
  font-family: ${() => robotoMono.style.fontFamily};
  font-size: 4rem;
`;

export const blink = keyframes`
  from,
  to {
    color: transparent;
  }
  50% {
    color: inherit;
  }
`;

export const StyledCursor = styled.div`
  font-family: ${() => robotoMono.style.fontFamily};
  font-size: 4rem;
  animation: ${blink} 1s steps(1, start) infinite;
`;

export const StyledContainer = styled.div`
  width: calc(100vw - 2rem);
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;
  padding: 1rem;
  text-align: center;

  @media (max-width: 1000px) {
    ${StyledH1} {
      font-size: 2.5rem;
    }
    ${StyledCursor} {
      font-size: 2.5rem;
    }
  }
`;
