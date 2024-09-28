"use client";

import { useMemo } from "react";
import { theme } from "@/app/theme";
import { styled } from "css-template-components/client";
import { useTimer } from "../context/hooks.ts/useTimer";
import { usePercentComplete } from "./hooks/usePercentComplete";
import { useTypingContext } from "../context/TypingContext";
import { useWPM } from "./hooks/useWPM";
import { useAccuracy } from "./hooks/useAccuracy";

interface StatsProps {
  correctCharacters: number;
  inputIndex: number;
  inputArray: Array<string>;
  textLength: number;
}

export const Stats = ({
  correctCharacters,
  inputIndex,
  inputArray,
  textLength,
}: StatsProps) => {
  // const { state, textLength } = useTypingContext();
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

const StyledContainer = styled(
  "div",
  `
    width: 16rem;
    filter: drop-shadow(0 0 0.25rem ${theme["gray"]});
    border-radius: 0.5rem;
    background: ${theme["darkerPurple"]};
    height: fit-content;
    padding: 1rem;
    position: relative
    z-index: 1;
`
);

const StyledLabel = styled(
  "div",
  `
    font-size: 1.5rem;
    font-style: italic;
`
);

const StyledValue = styled(
  "div",
  ({ padded }: { padded: boolean }) =>
    `
    padding-bottom: ${padded ? "1.5rem" : "none"};
    font-size: 1.5rem;
`
);

const StyledGradient = styled(
  "div",
  ({ isPaused }: { isPaused: boolean }) =>
    `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: linear-gradient(180deg, ${theme["ultraDarkPurple"]} 40%, transparent 90%);
    border-radius: 0.5rem;
    display: ${isPaused ? "flex" : "none"};
    justify-content: center;
    padding-top: 1rem;
    font-size: 2rem;
    font-style: italic;
`
);
