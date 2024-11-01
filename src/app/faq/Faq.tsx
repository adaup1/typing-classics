import React from "react";
import { styled } from "next-yak";
import { theme } from "@/app/theme";

interface FaqProps {
  question: string;
  answer: string;
}

export const Faq = ({ question, answer }: FaqProps) => {
  return (
    <StyledContainer>
      <StyledQuestion>{question}</StyledQuestion>
      <StyledAnswer>{answer}</StyledAnswer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 60rem;
  max-width: calc(100% - 2rem);
  background-color: ${() => theme.ultraDarkPurple};
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

const StyledQuestion = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: ${() => theme.gray} solid 1px;
`;

const StyledAnswer = styled.div`
  font-size: 1rem;
  font-weight: 200;
`;
