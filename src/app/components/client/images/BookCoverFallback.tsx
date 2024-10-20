import { useMemo } from "react";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";

const generateBackgroundColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }

  // Generate a slightly darker color
  let darkerColor = "#";
  for (let i = 1; i < 7; i += 2) {
    const value = Math.max(0, parseInt(color.substr(i, 2), 16) - 30);
    darkerColor += ("00" + value.toString(16)).substr(-2);
  }

  return { color, darkerColor };
};

interface BookCoverFallbackProps {
  title: string;
  author: string;
  width: string;
  height: string;
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
  const { color, darkerColor } = useMemo(
    () => generateBackgroundColor(title),
    [title]
  );

  const authorFontSize = useMemo(
    () => `${extractNumber(width) * 0.8}px`,
    [width]
  );

  const titleFontSize = useMemo(
    () => `${extractNumber(width) * 1.2}px`,
    [width]
  );

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

const StyledContainer = styled(
  "div",
  ({
    backgroundColor = theme["black"],
    darkerColor = theme["white"],
    height,
  }) =>
    `
    position: relative;
    height: ${height || "28rem"};
    width: 100%;
    border-radius: 0.5rem;
    background: repeating-linear-gradient(
      to right,
      ${backgroundColor},
      ${backgroundColor} 4%,
      ${darkerColor} 4%,
      ${darkerColor} 8%
    );
`
);

const StyledTextContainer = styled(
  "div",
  ({ fontSize }) =>
    `
    position: absolute;
    top: 5%;
    width: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    background: ${theme["white"]};
    color: ${theme["black"]};
    font-weight: 500;
    gap: ${fontSize};
    padding: ${fontSize};
    text-align: center;
    font-size: ${fontSize};
`
);

const StyledTitleContainer = styled(
  "div",
  ({ fontSize }) =>
    `
    font-weight: 700;
    font-size: ${fontSize};
`
);
