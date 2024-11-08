"use client";

import React, { useState, useCallback, useMemo } from "react";
import VirtualizedText from "@/app/books/[id]/type/components/CharacterRenderer/VirtualizedText";
import { AlwaysFocussedInput } from "@/app/components/inputs/AlwaysFocussedInput";
import { styled } from "next-yak";
import { useUpdateContextInput } from "../hooks/useUpdateContextInput";
import { useCountCorrectCharacters } from "./hooks/useCountCorrectCharacters";
import { Stats } from "./Stats/Stats";
import { MobileStats } from "./Stats/MobileStats";
import { useMediaQuery } from "react-responsive";
import { EasySpecialCharacters } from "./EasySpecialCharacters";

const CharacterRenderer = ({ text }: { text: string }) => {
  const [inputArray, setInputArray] = useState([""]);
  const [inputIndex, setInputIndex] = useState(-1);
  const [easySpecialaCharacters, setEasySpecialChatacters] = useState(false);
  const textLength = useMemo(() => text.length, [text]);
  const isMobile = useMediaQuery({ maxWidth: 1000 });

  useUpdateContextInput({
    inputArray,
    inputIndex,
  });

  const { setMatchMap, correctCharacters } = useCountCorrectCharacters();

  // Chunk the input text to avoid rendering entire book text in input
  const currentValue = useMemo(
    () => inputArray[inputArray.length - 1],
    [inputArray]
  );

  const handleOnInputChange = useCallback(
    (e) => {
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
    <StyledFlexContainer>
      <div>
        <StyledTextContainer isMobile={isMobile}>
          {!!isMobile && (
            <MobileStats
              correctCharacters={correctCharacters}
              inputIndex={inputIndex}
              textLength={textLength}
            />
          )}
          <div className="virtualizedText">
            <VirtualizedText
              text={text}
              inputIndex={inputIndex}
              inputArray={inputArray}
              setMatchMap={setMatchMap}
              easySpecialCharacters={easySpecialaCharacters}
            />
          </div>
          <StyledInput value={currentValue} onChange={handleOnInputChange} />
        </StyledTextContainer>
      </div>
      {!isMobile && (
        <div>
          <Stats
            correctCharacters={correctCharacters}
            inputIndex={inputIndex}
            textLength={textLength}
          />
          <EasySpecialCharacters
            onChange={setEasySpecialChatacters}
            value={easySpecialaCharacters}
          />
        </div>
      )}
    </StyledFlexContainer>
  );
};

interface ExtraProps {
  isMobile: boolean;
}

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  height: 100%;
`;

const StyledTextContainer = styled.div<ExtraProps>`
  width: ${({ isMobile }) => (isMobile ? "calc(100vw - 1rem)" : "50vw")};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;

  .virtualizedText {
    flex: 1;
  }
`;

const StyledInput = styled(AlwaysFocussedInput)`
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default CharacterRenderer;
