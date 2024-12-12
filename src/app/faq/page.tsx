import { styled } from "next-yak";
import map from "lodash/map";
import { Faq } from "./Faq";
import { faqs } from "./faqs";

export default function FAQ() {
  return (
    <StyledContainer>
      <StyledHeading>Frequently Asked Questions</StyledHeading>
      {map(faqs, (faq) => (
        <Faq key={faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2rem);
`;

const StyledHeading = styled.h2`
  font-family: inherit;
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 1rem;
`;
