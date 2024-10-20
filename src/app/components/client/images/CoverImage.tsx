"use client";

import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";
import { BookCoverFallback } from "./BookCoverFallback";

interface CoverImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  title: string;
  author: string;
  width: string;
  height: string;
}

export const CoverImage = ({
  width,
  height,
  title,
  src,
  author,
  ...restOfProps
}: CoverImageProps) => {
  return (
    <StyledImgContainer width={width} height={height}>
      {src ? (
        <StyledImg src={src} {...restOfProps} height={height} />
      ) : (
        <BookCoverFallback
          title={title}
          author={author}
          width={width}
          height={height}
        />
      )}
    </StyledImgContainer>
  );
};

const StyledImgContainer = styled(
  "div",
  ({ width = "12rem", height = "12rem" }: { width: string; height: string }) =>
    `
    width: ${width};
    height: ${height};
    filter: drop-shadow(0 0 0.2rem ${theme["gray"]});
    border-radius: 0.5rem;
`
);

const StyledImg = styled(
  "img",
  `
    height: inherit;
  	object-fit: cover;
    object-position: top;
    width: inherit;
    border-radius: 0.5rem;
`
);
