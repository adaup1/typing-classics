"use client";

import { theme } from "@/app/theme";
import { styled } from "next-yak";
import { useTimer } from "../../hooks/useTimer";
import { usePercentComplete } from "../../hooks/usePercentComplete";
import { useAccuracy } from "../../hooks/useAccuracy";
import { useCorrectCharacters } from "../hooks/useCorrectCharacters";

interface StatsProps {
  inputIndex: number;
  textLength: number;
}

export const Stats = ({ inputIndex, textLength }: StatsProps) => {
  const { correctCharacters } = useCorrectCharacters();
  const { formattedTime, isPaused, wpm } = useTimer({ correctCharacters });
  const percentComplete = usePercentComplete({
    inputIndex,
    textLength,
  });
  const { accuracy } = useAccuracy({ correctCharacters, inputIndex });

  return (
    <>
      <StyledContainer>
        <StyledLabel>Speed:</StyledLabel>
        <StyledValue padded>{`${wpm} WPM`}</StyledValue>
        <StyledLabel>Accurracy:</StyledLabel>
        <StyledValue padded>{`${accuracy}%`}</StyledValue>
        <StyledLabel>Elapsed Time:</StyledLabel>
        <StyledValue padded>{formattedTime}</StyledValue>
        <StyledLabel>Percent complete:</StyledLabel>
        <StyledValue>{percentComplete}</StyledValue>
        <StyledGradient isPaused={isPaused}>Start Typing!</StyledGradient>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  width: 16rem;
  filter: drop-shadow(0 0 0.25rem ${() => theme.gray});
  border-radius: 0.5rem;
  background: ${() => theme.purple};
  height: fit-content;
  padding: 1rem;
  position: relative;
  z-index: 1;
  cursor: default;
`;

const StyledLabel = styled.div`
  font-size: 1.5rem;
  font-style: italic;
`;

interface StyledValueProps {
  padded?: boolean;
}

const StyledValue = styled.div<StyledValueProps>`
  padding-bottom: ${({ padded }) => (padded ? "1.5rem" : "none")};
  font-size: 1.5rem;
`;

interface StyledGradientProps {
  isPaused?: boolean;
}

const StyledGradient = styled.div<StyledGradientProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  background: linear-gradient(
    180deg,
    ${() => theme.darkPurple} 40%,
    transparent 90%
  );
  border-radius: 0.5rem;
  display: ${({ isPaused }) => (isPaused ? "flex" : "none")};
  justify-content: center;
  padding-top: 1rem;
  font-size: 2rem;
  font-style: italic;
`;
