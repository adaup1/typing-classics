"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import map from "lodash/map";
import uniqueId from "lodash/uniqueId";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";
interface VirtualizedTextProps {
  text: string;
  inputIndex: number;
  inputValue: string;
}

interface RowProps {
  lineFirstCharIndex: number;
  style: React.CSSProperties;
  data: {
    lines: string[];
  };
}

const Row = ({ data, index, style }: ListChildComponentProps) => {
  const { text, lineFirstCharIndex } = useMemo(
    () => get(data, ["lines", index], {}),
    [data, index]
  );
  const inputIndex = useMemo(() => get(data, "inputIndex", 0), [data]);
  const inputValue = useMemo(() => get(data, "inputValue", ""), [data]);
  const fullText = useMemo(() => get(data, "fullText", ""), [data]);

  return (
    <div style={style} key={uniqueId()}>
      <>
        {map(text, (character, charIndex) => {
          const currentCharIndex = charIndex + lineFirstCharIndex;
          return (
            <StyledSpan
              inputIndex={inputIndex}
              index={currentCharIndex}
              text={fullText}
              key={uniqueId()}
              inputValue={inputValue}
              character={character}
            >
              {character}
            </StyledSpan>
          );
        })}
      </>
      <StyledInputValueContainer>
        {inputValue.substring(
          lineFirstCharIndex,
          lineFirstCharIndex + text.length
        )}
      </StyledInputValueContainer>
    </div>
  );
};

const VirtualizedText: React.FC<VirtualizedTextProps> = ({
  text,
  inputIndex,
  inputValue,
}: VirtualizedTextProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<any[]>([]);

  const splitTextIntoLines = useCallback(() => {
    if (!parentRef.current) {
      console.error("Parent container not available.");
      return;
    }

    const containerWidth = parentRef.current.offsetWidth;
    const context = document.createElement("canvas").getContext("2d");

    if (!context) {
      console.error("Canvas context not available.");
      return;
    }

    // Apply the font style of the parent container
    const fontStyle = window.getComputedStyle(parentRef.current).font;
    context.font = fontStyle;

    const words = text.split(" ");
    const newLines: { lineFirstCharIndex: number; text: string }[] = [];
    let currentLine = "";
    let currentIndex = 0; // Track the current index in the original string

    words.forEach((word, wordIndex) => {
      const testLine = currentLine.length > 0 ? `${currentLine} ${word}` : word;
      const testLineWidth = context.measureText(testLine).width;

      // If the test line fits within the container, keep building the line
      if (testLineWidth <= containerWidth) {
        currentLine = testLine;
      } else {
        // If it doesn't fit, push the current line and start a new one
        newLines.push({ lineFirstCharIndex: currentIndex, text: currentLine });
        currentLine = word; // Start a new line with the current word
        currentIndex += currentLine.length + 1; // Update index to the start of the new line
      }

      // Adjust the current index to reflect word placement
      currentIndex = text.indexOf(currentLine, currentIndex);
    });

    // Add the last line to the array
    if (currentLine.length > 0) {
      newLines.push({ lineFirstCharIndex: currentIndex, text: currentLine });
    }

    // Update state with the new lines for rendering
    setLines(newLines);
  }, [text]);

  useLayoutEffect(() => {
    const handleLayoutAndFontLoad = () => {
      const performSplit = () => {
        // Double requestAnimationFrame to ensure layout is fully stable
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            splitTextIntoLines();
          });
        });
      };

      // Ensure fonts are loaded before calculating line widths
      if (!isEmpty(document.fonts.ready) && !isEmpty(document.styleSheets)) {
        document.fonts.ready.then(() => {
          performSplit();
        });
      } else {
        performSplit(); // Fallback if document.fonts is not available
      }
    };

    // Trigger the function on mount
    handleLayoutAndFontLoad();

    // Also trigger on window resize
    window.addEventListener("resize", splitTextIntoLines);

    return () => window.removeEventListener("resize", splitTextIntoLines);
  }, [splitTextIntoLines]);

  return (
    <StyledOuterContainer>
      <StyledContainer ref={parentRef}>
        <AutoSizer>
          {({ width, height }) => (
            <StyledFixedSizeList
              height={height}
              itemCount={lines.length}
              layout="vertical"
              overscanCount={2}
              style={{ color: "#000000" }}
              itemSize={60}
              itemData={{ lines, inputIndex, inputValue, fullText: text }}
              width={width}
            >
              {Row}
            </StyledFixedSizeList>
          )}
        </AutoSizer>
      </StyledContainer>
    </StyledOuterContainer>
  );
};

export default VirtualizedText;

const StyledOuterContainer = styled(
  "div",
  `
  padding: 1rem;
  border: solid black 1px;
`
);

const StyledContainer = styled(
  "div",
  `
  white-space: pre-wrap;
  font: inherit;
  overflow-x: hidden;
  height: 60vh;
`
);

const StyledFixedSizeList = styled(
  FixedSizeList,
  `
  scrollbar-width: none;
`
);

const StyledSpan = styled(
  "span",
  ({ index, inputValue, text, inputIndex, character }) =>
    `
  background-color: ${
    index <= inputIndex
      ? character === inputValue[index]
        ? theme["green"]
        : theme["red"]
      : "transparent"
  };
`
);

const StyledInputValueContainer = styled(
  "div",
  `
    color: ${theme["gray"]};
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  `
);
