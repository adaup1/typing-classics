import { styled } from "css-template-components/server";
import { theme } from "@/app/theme";
import { BookCoverFallback } from "./BookCoverFallback";

interface CoverImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  title: string;
  author: string;
  width: string;
  height?: string;
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
    <StyledImgContainer width={width}>
      {src ? (
        <StyledImg src={src} {...restOfProps} />
      ) : (
        <StyledBookCoverFallback
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
  ({ width = "18rem" }: { width: string }) =>
    `
    width: ${width};
`
);

const StyledImg = styled(
  "img",
  `
  	object-fit: cover;
    width: inherit;
    filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
    border-radius: 0.5rem;
`
);

const StyledBookCoverFallback = styled(
  BookCoverFallback,
  `
   filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
    border-radius: 0.5rem;
`
);
