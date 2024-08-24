"use client";

import React, { useRef, useMemo } from "react";
import { VariableSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";

interface VirtualizedTextProps {
  text: string;
  currentLetterIndex: number;
}

interface LetterProps {
  columnIndex: number;
  rowIndex: number;
  style: any;
  data: any;
}

const Letter = ({ columnIndex, rowIndex, style, data }: LetterProps) => {
  const { words, currentLetterIndex } = data;
  const index = rowIndex * data.columnCount + columnIndex;
  const word = words[index] || "";
  return (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      <StyledSpan
        index={index}
        currentLetterIndex={currentLetterIndex}
        word={word}
        id={`text-item-${index}`}
      >
        {word}
      </StyledSpan>
    </div>
  );
};

const VirtualizedText: React.FC<VirtualizedTextProps> = ({
  text,
  currentLetterIndex,
}: VirtualizedTextProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // Split the text into words and spaces
  const words = useMemo(() => text.split(/(\s+)/).filter(Boolean), [text]);
  console.log("words", words);
  // Calculate the width of a single character in the monospace font
  const characterWidth = 10; // Adjust this value based on your font size and family

  return (
    <StyledContainer ref={parentRef}>
      <AutoSizer>
        {({ height, width }) =>
          height && width ? (
            <VariableSizeGrid
              columnCount={Math.floor(width / characterWidth)}
              columnWidth={(index) =>
                words[index] === " "
                  ? characterWidth
                  : words[index].length * characterWidth
              }
              height={height}
              rowCount={Math.ceil(
                words.length / Math.floor(width / characterWidth)
              )}
              rowHeight={() => 32}
              width={width}
              itemData={{
                words,
                currentLetterIndex,
                columnCount: Math.floor(width / characterWidth),
              }}
            >
              {Letter}
            </VariableSizeGrid>
          ) : null
        }
      </AutoSizer>
    </StyledContainer>
  );
};

export default VirtualizedText;

const StyledContainer = styled.div`
  white-space: pre-wrap;
  font: inherit;
  height: 100vh; /* Ensure the container takes up the full viewport height */
  overflow-x: hidden; /* Prevent horizontal scrolling */
`;

interface SpanProps {
  index: number;
  currentLetterIndex: number;
  word: string;
}

const StyledSpan = styled.span<SpanProps>`
  display: inline-block; /* Use inline-block to fit within the character width */
  padding-left: 3px;
  white-space: pre;
  background-color: ${({ index, currentLetterIndex, word }) => {
    return index <= currentLetterIndex
      ? word[index] === word[currentLetterIndex]
        ? "green"
        : "red"
      : "transparent";
  }};
`;
