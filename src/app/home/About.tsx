import React from "react";
import { styled } from "next-yak";
import { theme } from "../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const About = () => {
  return (
    <StyledContainer>
      <StyledH3>Why type books?</StyledH3>

      <div>
        <StyledParagraph>
          <StyledIcon icon={faStar} width={"1rem"} />
          {`Some say you learn better while taking notes. Why not take notes on
          the whole book?`}
        </StyledParagraph>
        <StyledParagraph>
          <StyledIcon icon={faStar} width={"1rem"} />
          {`You're bound to stay 100% focussed on the text if you want to avoid
          making mistakes!`}
        </StyledParagraph>
        <StyledParagraph>
          <StyledIcon icon={faStar} width={"1rem"} />
          {`Plus who has time to read? Wouldn't you rather multi-task?`}
        </StyledParagraph>
        <StyledParagraph>
          <StyledIcon icon={faStar} width={"1rem"} />
          {`Computers are hot right now! Improve your typing and literacy at the
          same time!`}
        </StyledParagraph>
        <StyledParagraph>
          <StyledIcon icon={faStar} width={"1rem"} />
          {`You can say you typed a book!`}
        </StyledParagraph>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  font-family: inherit;
  color: ${() => theme.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledH3 = styled.h3`
  font-weight: 500;
  font-size: 1.5rem;
  border-bottom: ${() => theme.white} solid 2px;
  padding-bottom: 1rem;
  width: fit-content;
`;

const StyledParagraph = styled.div`
  padding-top: 1rem;
  font-size: 1rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 1rem;
  padding-right: 12px;
  display: inline;
`;
