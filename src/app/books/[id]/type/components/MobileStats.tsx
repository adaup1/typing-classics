"use client";

import { useMemo } from "react";
import { theme } from "@/app/theme";
import { styled } from "css-template-components/client";
import { useTimer } from "../context/hooks.ts/useTimer";
import { useAccuracy } from "./hooks/useAccuracy";
import { usePercentComplete } from "./hooks/usePercentComplete";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface StatsProps {
  correctCharacters: number;
  inputIndex: number;
  inputArray: Array<string>;
  textLength: number;
}

export const MobileStats = ({
  correctCharacters,
  inputIndex,
  inputArray,
  textLength,
}: StatsProps) => {
  const { wpm, formattedTime } = useTimer({ correctCharacters });
  const percentComplete = usePercentComplete({
    inputIndex,
    textLength,
  });
  const { accuracy } = useAccuracy({ correctCharacters, inputIndex });

  return (
    <StyledContainer>
      <StyledIconContainer>
        <FontAwesomeIcon icon={faGear} />
      </StyledIconContainer>
      <StyledFlexContainer>
        <StyledFlexItem>
          <StyledLabel>Speed: </StyledLabel>
          {`${wpm} WPM`}
        </StyledFlexItem>
        <StyledFlexItem>
          <StyledLabel>Accurracy: </StyledLabel>
          {`${accuracy}%`}
        </StyledFlexItem>
        <StyledFlexItem>
          <StyledLabel>Elapsed Time: </StyledLabel>
          {formattedTime}
        </StyledFlexItem>
        <StyledFlexItem>
          <StyledLabel>Percent complete: </StyledLabel>
          {percentComplete}
        </StyledFlexItem>
      </StyledFlexContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  `
    filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
    border-radius: 0.5rem;
    background: ${theme["darkerPurple"]};
    height: fit-content;
    margin-bottom: 1rem;
`
);

const StyledIconContainer = styled(
  "div",
  `
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`
);

// const StyledIcon = styled(
//   FontAwesomeIcon,
//   `
//   position: absolute;
//   right: 0;
//   padding: 0.5rem;
// `
// );

const StyledFlexContainer = styled(
  "div",
  `
    padding: 0 1rem 1rem 1rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 0.5rem;

`
);

const StyledFlexItem = styled(
  "div",
  `
  // width: 50%;
`
);

const StyledLabel = styled(
  "span",
  `
    font-style: italic;
`
);
