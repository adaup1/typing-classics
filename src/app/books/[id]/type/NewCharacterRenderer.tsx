"use client";

import React, { useState, useCallback, useMemo } from "react";
import VirtualizedText from "@/app/components/lists/VirtualizedText";
import { AlwaysFocussedInput } from "@/app/components/inputs";

export const CharacterRenderer = ({ text }: { text: string }) => {
  const [inputArray, setInputArray] = useState([""]);
  const [inputIndex, setInputIndex] = useState(-1);
  // Chunk the input text to avoid rendering entire book text in input
  const currentValue = useMemo(
    () => inputArray[inputArray.length - 1],
    [inputArray]
  );

  const handleOnInputChange = useCallback(
    (e: { target: { value: any } }) => {
      const { value } = e.target;
      const currentArrayIndex = inputArray.length - 1;
      const currentChunk = inputArray[currentArrayIndex];

      if (value.length < currentChunk.length) {
        if (value.length > 0 || inputArray.length === 1) {
          setInputArray((prev) => {
            const newArr = [...prev];
            newArr[currentArrayIndex] = value;
            return newArr;
          });
        } else if (inputArray.length > 1) {
          setInputArray((prev) => prev.slice(0, -1));
        }
        setInputIndex((prev) => prev - 1);
      } else {
        if (currentChunk.length <= 100) {
          setInputArray((prev) => {
            const newArr = [...prev];
            newArr[currentArrayIndex] = value;
            return newArr;
          });
        } else {
          setInputArray((prev) => [...prev, value.slice(101)]);
        }
        setInputIndex((prev) => prev + 1);
      }
    },
    [inputArray]
  );

  return (
    <div>
      <VirtualizedText
        text={text}
        inputIndex={inputIndex}
        inputArray={inputArray}
      />
      <AlwaysFocussedInput
        value={currentValue}
        onChange={handleOnInputChange}
      />
    </div>
  );
};
