"use client";

import React, { useCallback, useMemo } from "react";
import { ListChildComponentProps } from "react-window";
import get from "lodash/get";
import map from "lodash/map";
import uniqueId from "lodash/uniqueId";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";

const useFindChunk = () => {
  const findCharacterLocation = useCallback(
    ({
      stringArray,
      characterLocation,
    }: {
      stringArray: Array<string>;
      characterLocation: number;
    }) => {
      // Ensure the input is valid
      if (
        !Array.isArray(stringArray) ||
        stringArray.length === 0 ||
        typeof characterLocation !== "number"
      ) {
        throw new Error("Invalid input");
      }

      // Each string in the array is exactly 100 characters long
      const chunkLength = 101;

      // Calculate the chunk index and the position within the chunk
      const chunkIndex = Math.floor(characterLocation / chunkLength);
      const positionInChunk = characterLocation % chunkLength;

      // Validate if the chunkIndex is within bounds
      if (chunkIndex >= stringArray.length) {
        return;
      }

      // Return the result in the form of an object for clarity
      return {
        character: stringArray[chunkIndex][positionInChunk] ?? "",
      };
    },
    []
  );
  return { findCharacterLocation };
};

export const Row = ({ data, index, style }: ListChildComponentProps) => {
  const { text, lineFirstCharIndex } = useMemo(
    () => get(data, ["lines", index], {}),
    [data, index]
  );
  const inputIndex = useMemo(() => get(data, "inputIndex", -1), [data]);
  const inputArray = useMemo(() => get(data, "inputArray", [""]), [data]);
  const { findCharacterLocation } = useFindChunk();

  return (
    <StyledFlexContainer style={style} key={uniqueId()}>
      <>
        {map(text, (character, charIndex) => {
          const currentCharIndex = charIndex + lineFirstCharIndex;
          const result = findCharacterLocation({
            stringArray: inputArray,
            characterLocation: parseInt(currentCharIndex, 10),
          });

          return (
            <StyledInnerFlexContainer>
              <StyledCharacter
                inputIndex={inputIndex}
                index={currentCharIndex}
                key={uniqueId()}
                inputValue={result?.character || ""}
                character={character}
                id={`text-item-${currentCharIndex}`}
              >
                {character}
              </StyledCharacter>
              <StyledInputValueContainer>
                {result?.character || ""}
              </StyledInputValueContainer>
            </StyledInnerFlexContainer>
          );
        })}
      </>
    </StyledFlexContainer>
  );
};

const StyledFlexContainer = styled(
  "div",
  `
    display: flex;
    justify-content: flex-start;
`
);

interface StyledSpanProps {
  index: number;
  inputIndex: number;
  inputValue: string;
  character: string;
  inputCharacter: string;
}

const StyledCharacter = styled(
  "div",
  ({ index, inputValue, inputIndex, character }: StyledSpanProps) => `
    background-color: ${
      index <= inputIndex
        ? character === inputValue
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

const StyledInnerFlexContainer = styled(
  "div",
  `
    display: flex;
    flex-direction: column;
`
);
