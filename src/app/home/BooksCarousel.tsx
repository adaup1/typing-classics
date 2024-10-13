import React from "react";
import { styled } from "css-template-components/server";
import { getHotBooks } from "../lib/queries/getHotBooks";
import { BookCard } from "../books/components/BookCard";
import { theme } from "../theme";
import map from "lodash/map";
import { Button } from "../components/server/buttons/Button";
import Link from "next/link";

export const BooksCarousel = async () => {
  const books = await getHotBooks();
  return (
    <StyledContainer>
      <StyledLabelContainer>{`What's hot?`}</StyledLabelContainer>
      <StyledBooksContainer>
        {map(books, (book) => (
          <BookCard book={book} isMobile={false} />
        ))}
      </StyledBooksContainer>
      <div>
        <Link href="/books">
          <Button text="View All Books" />
        </Link>
      </div>
      <StyledLeftGradient />
      <StyledRightGradient />
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
  position: relative;
`
);

const StyledLabelContainer = styled(
  "h3",
  `
  font-family: inherit;
  font-weight: 400;
  font-size: 1.5rem;
  padding: 1rem;
  border-bottom: ${theme["white"]} solid 1px;
`
);

const StyledBooksContainer = styled(
  "div",
  `
  display: flex;
  flex-wrap: none;
  gap: 1rem;
  width: calc(100vw - 4rem);
  overflow: scroll;
  padding: 1rem;
  margin: 1rem;
  background: ${theme["darkerPurple"]};
  border-radius: 1rem;
`
);

const StyledLeftGradient = styled(
  "div",
  `
  background: linear-gradient(90deg, ${theme["darkerPurple"]} 50%, transparent 100%);
  position: absolute;
  height: 100%;
  width: 2.25rem;
  left: 0;
  z-index: 5;
`
);

const StyledRightGradient = styled(
  "div",
  `
  background: linear-gradient(270deg, ${theme["darkerPurple"]} 50%, transparent 100%);
  position: absolute;
  height: 100%;
  width: 2.25rem;
  right: 0;
  z-index: 5;
`
);
