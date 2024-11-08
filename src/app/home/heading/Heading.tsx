"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  StyledContainer,
  StyledH1,
  StyledCursor,
  StyledTextContainer,
} from "./styled";

const TEXT = "Books at Your Fingertips";

const Heading = () => {
  const [displayText, setDisplayText] = useState(TEXT[0]);
  const isMobile = useMediaQuery({ maxWidth: 1000 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayText.length < TEXT.length) {
        setDisplayText((prev) => prev + TEXT[prev.length]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [displayText]);

  return (
    <StyledContainer>
      {isMobile ? (
        <StyledH1>{TEXT}</StyledH1>
      ) : (
        <StyledTextContainer>
          <StyledH1>{displayText}</StyledH1>
          {displayText.length < TEXT.length && <StyledCursor>_</StyledCursor>}
        </StyledTextContainer>
      )}
    </StyledContainer>
  );
};

export default Heading;
