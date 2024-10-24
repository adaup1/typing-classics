import { styled } from "next-yak";
import { theme } from "@/app/theme";

const generateBackgroundColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }

  // Generate a slightly darker color
  let darkerColor = "#";
  for (let i = 1; i < 6; i += 2) {
    const value = Math.max(0, parseInt(color.slice(i, i + 2), 16) - 30);
    darkerColor += ("00" + value.toString(16)).slice(-2);
  }

  return { color, darkerColor };
};

interface BookCoverFallbackProps {
  title: string;
  author: string;
  width: string;
  height?: string;
}

const extractNumber = (str) => {
  const match = str.match(/^\d+/);
  return match ? parseInt(match[0], 10) : 1;
};

export const BookCoverFallback = ({
  title,
  author,
  width,
  height,
}: BookCoverFallbackProps) => {
  const { color, darkerColor } = generateBackgroundColor(title);
  const authorFontSize = `${extractNumber(width) * 0.8}px`;
  const titleFontSize = `${extractNumber(width) * 1.2}px`;

  return (
    <StyledContainer
      backgroundColor={color}
      darkerColor={darkerColor}
      height={height}
    >
      <StyledTextContainer fontSize={authorFontSize}>
        <StyledTitleContainer fontSize={titleFontSize}>
          {title}
        </StyledTitleContainer>
        <div>{author}</div>
      </StyledTextContainer>
    </StyledContainer>
  );
};

interface ExtraProps {
  height?: string;
  fontSize?: string;
  backgroundColor?: string;
  darkerColor?: string;
}

const StyledContainer = styled.div<ExtraProps>`
  position: relative;
  height: ${({ height }) => height || "28rem"};
  width: 100%;
  border-radius: 0.5rem;
  background: ${({ backgroundColor, darkerColor }) => `
    repeating-linear-gradient(
      to right,
      ${backgroundColor || theme.black},
      ${backgroundColor || theme.black} 4%,
      ${darkerColor || theme.white} 4%,
      ${darkerColor || theme.white} 8%
    )
  `};
`;

const StyledTextContainer = styled.div<ExtraProps>`
  position: absolute;
  top: 5%;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  background: ${() => theme.white};
  color: ${() => theme.black};
  font-weight: 500;
  gap: ${({ fontSize }) => fontSize};
  padding: ${({ fontSize }) => fontSize};
  text-align: center;
  font-size: ${({ fontSize }) => fontSize};
`;

const StyledTitleContainer = styled.div<ExtraProps>`
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
`;
