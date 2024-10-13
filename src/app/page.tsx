import { styled } from "css-template-components/server";
import { theme } from "./theme";
import { About, BooksCarousel } from "./home";

export default function Home() {
  return (
    <>
      <BooksCarousel />
      <StyledContainer>
        <About />
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled(
  "div",
  `
  background: ${theme["ultraDarkPurple"]};
  padding-bottom: 2rem;
  padding-top: 1rem;
`
);
