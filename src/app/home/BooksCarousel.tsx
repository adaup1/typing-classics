import React from "react";
import { styled } from "css-template-components/server";
import { BookCard } from "../books/components/BookCard";
import { theme } from "../theme";
import map from "lodash/map";
import { Button } from "../components/server/buttons/Button";
import Link from "next/link";
import { Book } from "../lib/types.d";

interface BooksCarouselProps {
  books: Array<Book>;
  heading: string;
  showBooksLink?: boolean;
}

export const BooksCarousel = async ({
  books,
  heading,
  showBooksLink = false,
}: BooksCarouselProps) => {
  return (
    <StyledContainer>
      <StyledLabelContainer>{heading}</StyledLabelContainer>
      <StyledBooksContainer>
        {map(books, (book) => (
          <BookCard book={book} isMobile={false} />
        ))}
      </StyledBooksContainer>
      {showBooksLink && (
        <div>
          <Link href="/books">
            <StyledButton text="View All Books" />
          </Link>
        </div>
      )}
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
  position: relative;
`
);

const StyledLabelContainer = styled(
  "h3",
  `
  font-family: inherit;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 0 1rem 1rem 1rem;
  border-bottom: ${theme["white"]} solid 2px;
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
  padding:  1rem;
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

const StyledButton = styled(
  Button,
  `
  margin-bottom: 2rem;
  button {
    font-size: 2rem;
  }
`
);
