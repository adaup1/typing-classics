import { useCallback, useState } from "react";

interface UseSplitTextIntoLinesProps {
  text: string;
  parentRef: React.RefObject<HTMLDivElement>;
}

export const useSplitTextIntoLines = ({
  text,
  parentRef,
}: UseSplitTextIntoLinesProps) => {
  const [lines, setLines] = useState<
    { lineFirstCharIndex: number; text: string }[]
  >([]);

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
        newLines.push({
          lineFirstCharIndex: currentIndex,
          text: currentLine,
        });
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
  }, [parentRef, text]);

  return {
    splitTextIntoLines,
    lines,
  };
};
