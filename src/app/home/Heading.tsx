"use client";

import { useState, useEffect } from "react";
import { robotoMono } from "../theme/fonts";
import { styled } from "css-template-components/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { Roboto_Mono } from "next/font/google";

const TEXT = "Books at Your Fingertips";

export const Heading = () => {
  const [displayText, setDisplayText] = useState(TEXT[0]);

  useEffect(() => {
    console.log("interval trigger");

    const interval = setInterval(() => {
      if (displayText.length < TEXT.length) {
        setDisplayText((prev) => prev + TEXT[prev.length]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [displayText]);

  return (
    <StyledContainer>
      <StyledTextContainer>
        <StyledH1>{displayText}</StyledH1>
        {displayText.length < TEXT.length && <StyledCursor>_</StyledCursor>}
      </StyledTextContainer>
      {/* 
      <div>
        {displayText.length === TEXT.length && (
          <StyledIcon icon={faFingerprint} />
        )}
      </div> */}
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  `
    width 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    height: 8rem;
    margin-bottom: 2rem;
    align-items: center;
`
);

const StyledTextContainer = styled(
  "div",
  `
    display: flex;
`
);

const StyledH1 = styled(
  "h1",
  `
    font-family: ${robotoMono.style.fontFamily};
    font-size: 4rem;
`
);

const StyledCursor = styled(
  "div",
  () =>
    `
        font-family: ${robotoMono.style.fontFamily};
        font-size: 4rem;
      animation: blink 1s steps(1, start) infinite;
    `
);

const StyledIcon = styled(
  FontAwesomeIcon,
  `
  font-size: 4rem;
  width: fit-content;
`
);
