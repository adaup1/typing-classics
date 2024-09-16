"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import VirtualizedText from "@/app/components/lists/VirtualizedText";
import { AlwaysFocussedInput } from "@/app/components/inputs";
import { useTypingContext } from "./context/TypingContext";
import { styled } from "css-template-components/client";
import { dummyIndex, dummyInput } from "./DummyInput";

export const CharacterRenderer = ({ text }: { text: string }) => {
  const { updateInput } = useTypingContext();
  const [inputArray, setInputArray] = useState([""]);
  const [inputIndex, setInputIndex] = useState(-1);
  const [delay, setDelay] = useState(150);

  // Refs to store the current inputArray and inputIndex without triggering re-renders
  const inputArrayRef = useRef(inputArray);
  const inputIndexRef = useRef(inputIndex);
  const delayRef = useRef(delay);

  // Chunk the input text to avoid rendering entire book text in input
  const currentValue = useMemo(
    () => inputArray[inputArray.length - 1],
    [inputArray]
  );

  useEffect(() => {
    // Update the refs when inputArray and inputIndex change
    inputArrayRef.current = inputArray;
    inputIndexRef.current = inputIndex;
  }, [inputArray, inputIndex]);

  useEffect(() => {
    delayRef.current = delay;
  }, [delay]);

  // useEffect(() => {
  //   if (inputIndex >= 100 && inputIndex < 500 && delay !== 500) {
  //     setDelay(500);
  //   }
  //   if (inputIndex >= 500 && inputIndex < 1000 && delay !== 850) {
  //     setDelay(500);
  //   }
  //   if (inputIndex >= 1000 && inputIndex < 3000 && delay !== 1500) {
  //     setDelay(1500);
  //   }
  //   if (inputIndex > 3000 && delay !== 3000) {
  //     setDelay(3000);
  //   }
  // }, [delay, inputIndex]);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () =>
  //       updateInput({
  //         inputArray: inputArrayRef.current,
  //         inputIndex: inputIndexRef.current,
  //       }),

  //     delayRef.current
  //   );
  //   return () => clearInterval(interval);
  // }, [delayRef.current, updateInput]);

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
