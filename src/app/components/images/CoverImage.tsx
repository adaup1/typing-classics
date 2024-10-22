import { styled } from "next-yak";
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
    <StyledImgContainer width={width} height={height}>
      {src ? (
        <StyledImg src={src} {...restOfProps} height={height} />
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

interface ExtraProps {
  width?: string;
  height?: string;
}

const StyledImgContainer = styled.div<ExtraProps>`
  width: ${({ width }) => width || "18rem"};
  height: ${({ height }) => height || "inherit"};
  filter: ${() => `drop-shadow(0 0 0.5rem ${theme.gray})`};
  border-radius: 0.5rem;
`;

const StyledImg = styled.img<ExtraProps>`
  object-fit: cover;
  width: inherit;
  border-radius: 0.5rem;
  height: ${({ height }) => height || "inherit"};
`;

const StyledBookCoverFallback = styled(BookCoverFallback)`
  border-radius: 0.5rem;
`;
