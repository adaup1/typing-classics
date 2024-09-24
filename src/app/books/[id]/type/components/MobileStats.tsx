"use client";

import { useMemo } from "react";
import { theme } from "@/app/theme";
import { styled } from "css-template-components/client";
import { useTimer } from "../context/hooks.ts/useTimer";

export const MobileStats = () => {
  const time = useTimer();

  const formattedTime = useMemo(
    () => new Date(time * 1000).toISOString().slice(11, 19),
    [time]
  );

  const speed = 30;
  return (
    <StyledContainer>
      <div>
        <StyledLabel>Speed: </StyledLabel>
        {`${speed} WPM`}
      </div>
      <div>
        <StyledLabel>Accurracy: </StyledLabel>
        89%
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  `
    width: calc(100vw - 6rem);
    filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
    border-radius: 0.5rem;
    background: ${theme["darkerPurple"]};
    height: fit-content;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`
);

const StyledLabel = styled(
  "span",
  `
    font-style: italic;
`
);
