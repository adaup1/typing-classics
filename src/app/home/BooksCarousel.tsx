import React from "react";
import { styled } from "next-yak";
import { BookCard } from "../books/components/BookCard";
import { theme } from "../theme";
import map from "lodash/map";
import uniqueId from "lodash/uniqueId";
import { Button } from "../components/buttons";
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
          <BookCard
            book={book}
            isMobile={false}
            key={`${book.book_id}_${uniqueId}`}
          />
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const StyledLabelContainer = styled.h3`
  font-family: inherit;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 0 1rem 1rem 1rem;
  border-bottom: ${() => theme.white} solid 2px;
`;

const StyledBooksContainer = styled.div`
  display: flex;
  flex-wrap: none;
  gap: 1rem;
  width: calc(100vw - 4rem);
  overflow-x: scroll;
  padding: 1rem;
  margin: 1rem;
  background: ${() => theme.purple};
  border-radius: 1rem;

  &::-webkit-scrollbar {
    height: 0.75rem;
  }

  &::-webkit-scrollbar-track {
    background: ${() => theme.purple};
  }

  &::-webkit-scrollbar-thumb {
    background: ${() => theme.darkPurple};
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${() => theme.gray};
  }
`;

const StyledLeftGradient = styled.div`
  background: linear-gradient(
    90deg,
    ${() => theme.purple} 50%,
    transparent 100%
  );
  position: absolute;
  height: 22rem;
  width: 2.25rem;
  left: 0;
  z-index: 5;
`;

const StyledRightGradient = styled.div`
  background: linear-gradient(
    270deg,
    ${() => theme.purple} 50%,
    transparent 100%
  );
  position: absolute;
  height: 22rem;
  width: 2.25rem;
  right: 0;
  z-index: 5;
`;

const StyledButton = styled(Button)`
  margin-bottom: 2rem;
  font-size: 2rem;
`;
