"use client";

import { theme } from "@/app/theme";
import { styled } from "next-yak";
import { useTimer } from "../../hooks/useTimer";
import { useAccuracy } from "../../hooks/useAccuracy";
import { useCorrectCharacters } from "../hooks/useCorrectCharacters";

interface StatsProps {
  inputIndex: number;
  textLength: number;
}

export const MobileStats = ({ inputIndex }: StatsProps) => {
  const { correctCharacters } = useCorrectCharacters();
  const { wpm, isPaused } = useTimer({ correctCharacters });
  const { accuracy } = useAccuracy({ correctCharacters, inputIndex });

  return (
    <StyledContainer>
      <StyledFlexContainer>
        <StyledFlexItem>
          <StyledLabel>Speed: </StyledLabel>
          <div>{`${wpm} WPM`}</div>
        </StyledFlexItem>
        <StyledFlexItem>
          <StyledLabel>Accuracy: </StyledLabel>
          <div>{`${accuracy}%`}</div>
        </StyledFlexItem>
      </StyledFlexContainer>
      <StyledGradient isPaused={isPaused}>Start Typing!</StyledGradient>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  filter: drop-shadow(0 0 0.5rem ${() => theme.gray});
  border-radius: 0.5rem;
  background: ${() => theme.purple};
  height: fit-content;
  padding: 0.5rem;
  position: relative;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  max-width: 100%;
`;

const StyledFlexItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9rem;
`;

const StyledLabel = styled.span`
  font-style: italic;
  color: ${() => theme.white};
  margin-bottom: 0.5rem;
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
  background: ${() => theme.darkPurple};
  border-radius: 0.5rem;
  display: ${({ isPaused }) => (isPaused ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-style: italic;
`;
