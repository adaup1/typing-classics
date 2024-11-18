import React from "react";
import { styled } from "next-yak";
import { theme } from "@/app/theme";

interface FaqProps {
  question: string;
  answer: string | Array<string | { type: "link"; text: string; href: string }>;
}

export const Faq = ({ question, answer }: FaqProps) => {
  const renderAnswer = (
    answer:
      | string
      | Array<string | { type: "link"; text: string; href: string }>
  ) => {
    if (typeof answer === "string") return answer;

    return answer.map((part, index) => {
      if (typeof part === "string") return part;
      if (part.type === "link") {
        return (
          <StyledAnchor
            key={index}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part.text}
          </StyledAnchor>
        );
      }
      return null;
    });
  };

  return (
    <StyledContainer>
      <StyledQuestion>{question}</StyledQuestion>
      <StyledAnswer>{renderAnswer(answer)}</StyledAnswer>
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

const StyledAnchor = styled.a`
  color: ${() => theme.white};
`;
