"use client";

import { useMemo, useState } from "react";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";
import { CoverImage } from "@/app/components/client/images/CoverImage";
import { Book } from "@/app/lib/types.d";
import Link from "next/link";

export const BookCard = ({
  book,
  isMobile,
}: {
  book: Book;
  isMobile: boolean;
}) => {
  const { width, height } = useMemo(() => {
    return {
      width: isMobile ? "8rem" : "12rem",
      height: isMobile ? "12rem" : "18rem",
    };
  }, [isMobile]);

  const author = useMemo(
    () =>
      book.author_last_name
        ? `${book.author_first_name} ${book.author_last_name}`
        : book.author_first_name,
    [book.author_first_name, book.author_last_name]
  );

  return (
    <StyledContainer width={width}>
      <Link href={`/books/${book.book_id}/type`}>
        <CoverImage
          src={book.cover_image_url}
          alt={`Cover of ${book.title_short}`}
          width={width}
          height={height}
        />
        <StyledInnerContainer width={width} height={height} isMobile={isMobile}>
          <StyledTitle isMobile={isMobile}>{book.title_short}</StyledTitle>
          <StyledAuthor isMobile={isMobile}>{author}</StyledAuthor>
        </StyledInnerContainer>
        {/* <StyledWordCount>{`Ready to type ${book.word_count} words?`}</StyledWordCount> */}
      </Link>
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  ({ width }) =>
    `
  width: ${width};
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
`
);

const StyledInnerContainer = styled(
  "div",
  ({ width, height, isMobile }) =>
    `
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  background: linear-gradient(0deg, ${theme["ultraDarkPurple"]} ${isMobile ? "50%" : "30%"}, transparent 70%);
  width: ${width};
  height: ${height};
  border-radius: 0.5rem; 
`
);

const StyledTitle = styled(
  "div",
  ({ isMobile }) =>
    `
  font-size: ${isMobile ? "0.75rem" : "1rem"};
  width: 95%;
  padding: 0.5rem;
  color: ${theme["white"]};
  text-decoration: none;
  position: absolute;
  top: ${isMobile ? "50%" : "70%"};
  left: 50%;
  transform: translateX(-50%);
  z-index: 8;
`
);

const StyledAuthor = styled(
  "div",
  ({ isMobile }) =>
    `
    width: 95%;
    padding: 0.5rem;
    color: ${theme["gray"]};
    text-decoration: none;
    position: absolute;
    bottom: 1%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 8;
    font-size: ${isMobile ? "0.5rem" : "0.75rem"};
  `
);

// const StyledWordCount = styled(
//   "div",
//   `
//   color: ${theme["white"]};
//   font-weight: 700;

//   width: 12rem;
//   position: absolute;
//   top: -50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 8;

//   display: none;

//   `
// );
