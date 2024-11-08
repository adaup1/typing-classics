"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  Suspense,
} from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import isEmpty from "lodash/isEmpty";
import { styled } from "next-yak";
import { theme } from "@/app/theme";
import { Row } from "./Row";
import { robotoMono } from "@/app/theme/fonts";

interface VirtualizedTextProps {
  text: string;
  inputIndex: number;
  inputArray: Array<string>;
  setMatchMap: ({ key, count }: { key: number; count: number }) => void;
  easySpecialCharacters: boolean;
}

const VirtualizedText: React.FC<VirtualizedTextProps> = ({
  text,
  inputIndex,
  inputArray,
  setMatchMap,
  easySpecialCharacters,
}: VirtualizedTextProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<
    { lineFirstCharIndex: number; text: string }[]
  >([]);

  const visibleStartIndexRef = useRef(0);

  const handleItemsRendered = useCallback(
    ({ visibleStartIndex }: { visibleStartIndex: number }) => {
      visibleStartIndexRef.current = visibleStartIndex;
    },
    []
  );

  const handleScroll = useCallback(() => {
    if (inputIndex <= text.length && inputIndex > 0) {
      const targetElement = document.getElementById(`text-item-${inputIndex}`);
      if (targetElement && innerRef.current) {
        requestAnimationFrame(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            inline: "nearest",
            block: "start",
          });
        });
      }
    }
  }, [inputIndex, text.length]);

  useEffect(() => {
    if (
      lines &&
      inputIndex &&
      document.getElementById(`text-item-${inputIndex}`)
    ) {
      handleScroll();
    }
  }, [handleScroll, inputIndex, lines]);

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

    words.forEach((word) => {
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
        <Suspense fallback={<div>hello there this is it</div>}>
          <AutoSizer>
            {({ width, height }) => (
              <StyledFixedSizeListContainer ref={innerRef}>
                <FixedSizeList
                  className="virtualized-text-list"
                  height={height}
                  itemCount={lines.length}
                  layout="vertical"
                  overscanCount={2}
                  style={{ color: theme.white, scrollbarWidth: "none" }}
                  itemSize={60}
                  itemData={{
                    lines,
                    inputIndex,
                    inputArray,
                    visibleStartIndex: visibleStartIndexRef.current,
                    setMatchMap,
                    easySpecialCharacters,
                  }}
                  width={width}
                  onItemsRendered={handleItemsRendered}
                >
                  {Row}
                </FixedSizeList>
                <StyledGradient width={width} height={height} />
              </StyledFixedSizeListContainer>
            )}
          </AutoSizer>
        </Suspense>
      </StyledContainer>
    </StyledOuterContainer>
  );
};

export default VirtualizedText;

const StyledOuterContainer = styled.div`
  padding: 1rem;
  background: ${() => theme.ultraDarkPurple};
  border-radius: 0.5rem;
  filter: drop-shadow(0 0 0.5rem ${() => theme.gray});
  position: relative;
  height: 100%;
  width: -webkit-fill-available;
  font-family: ${() => robotoMono.style.fontFamily}, monosapce;
`;

interface GradientProps {
  width: number;
  height: number;
}

const StyledGradient = styled.div<GradientProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: 10;
  background: linear-gradient(
    0deg,
    ${() => theme.ultraDarkPurple} 0%,
    transparent 90%
  );
`;

const StyledContainer = styled.div`
  position: relative;
  white-space: pre-wrap;
  font: inherit;
  overflow-x: hidden;
  overflow-y: hidden;
  height: calc(100vh - 20rem);
`;

const StyledFixedSizeListContainer = styled.div`
  /* width: "-webkit-fill-available"; */
`;

// const StyledFixedSizeList = styled(FixedSizeList)`
//   > * {
//     scrollbar-width: none;
//   }
// `;
