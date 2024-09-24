"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import VirtualizedText from "@/app/books/[id]/type/components/CharacterRenderer/VirtualizedText";
import { AlwaysFocussedInput } from "@/app/components/inputs";
import { useTypingContext } from "../../context/TypingContext";
import { styled } from "css-template-components/client";
import { dummyIndex, dummyInput } from "../DummyInputB";
import { useUpdateContextInput } from "../hooks/useUpdateContextInput";

export const CharacterRenderer = ({ text }: { text: string }) => {
  const { updateInput } = useTypingContext();
  const [inputArray, setInputArray] = useState([""]);
  const [inputIndex, setInputIndex] = useState(-1);
  useUpdateContextInput({
    setContextState: updateInput,
    inputArray,
    inputIndex,
  });

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
      <StyledInputContainer>
        <AlwaysFocussedInput
          value={currentValue}
          onChange={handleOnInputChange}
        />
      </StyledInputContainer>
    </div>
  );
};

const StyledInputContainer = styled(
  "div",
  `
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
);
