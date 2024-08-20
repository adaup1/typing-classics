"use client";

import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import { VirtualizedList } from "./VirtualizedList";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";

interface VirtualizedTextProps {
  text: string;
}

const VirtualizedText: React.FC<VirtualizedTextProps> = ({
  text,
}: VirtualizedTextProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

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
    const newLines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine.length > 0 ? `${currentLine} ${word}` : word;
      const testLineWidth = context.measureText(testLine).width;

      // If the test line fits within the container, keep building the line
      if (testLineWidth <= containerWidth) {
        currentLine = testLine;
      } else {
        // If it doesn't fit, push the current line and start a new one
        newLines.push(currentLine);
        currentLine = word; // Start a new line with the current word
      }
    });

    // Add the last line to the array
    if (currentLine.length > 0) {
      newLines.push(currentLine);
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
    <StyledContainer ref={parentRef}>
      <VirtualizedList
        totalItems={lines.length}
        itemHeight={30}
        windowHeight={500}
        renderItem={({ index }: { index: number }) => {
          return <div key={index}>{lines[index]}</div>;
        }}
        overscan={10}
      />
    </StyledContainer>
  );
};

export default VirtualizedText;

const StyledContainer = styled.div`
  white-space: pre-wrap;
  font: inherit;
`;
