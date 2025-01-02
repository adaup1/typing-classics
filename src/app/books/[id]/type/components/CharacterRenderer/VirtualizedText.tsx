"use client";

import React, {
  useRef,
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
import { useSplitTextIntoLines } from "./hooks/useSplitTextIntoLines";

interface VirtualizedTextProps {
  text: string;
  inputIndex: number;
  inputArray: Array<string>;
  easySpecialCharacters: boolean;
}

const VirtualizedText: React.FC<VirtualizedTextProps> = ({
  text,
  inputIndex,
  inputArray,
  easySpecialCharacters,
}: VirtualizedTextProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { splitTextIntoLines, lines } = useSplitTextIntoLines({
    text,
    parentRef,
  });

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
              <div ref={innerRef}>
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
                    easySpecialCharacters,
                  }}
                  width={width}
                  onItemsRendered={handleItemsRendered}
                >
                  {Row}
                </FixedSizeList>
                <StyledGradient width={width} height={height} />
              </div>
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
  background: ${() => theme.darkPurple};
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
    ${() => theme.darkPurple} 0%,
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
