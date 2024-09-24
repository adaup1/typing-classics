"use client";

import { useCallback, useMemo, useRef } from "react";
import { ListChildComponentProps } from "react-window";
import get from "lodash/get";
import map from "lodash/map";
import uniqueId from "lodash/uniqueId";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";
import { useFindChunk } from "./hooks/useFindChunk";

export const Row = ({ data, index, style }: ListChildComponentProps) => {
  const { text, lineFirstCharIndex } = useMemo(
    () => get(data, ["lines", index], {}),
    [data, index]
  );
  const inputIndex = useMemo(() => get(data, "inputIndex", -1), [data]);
  const inputArray = useMemo(() => get(data, "inputArray", [""]), [data]);
  const visibleStartIndex = useMemo(
    () => get(data, "visibleStartIndex", 0),
    [data]
  );
  const setMatchMap = useMemo(
    () =>
      get(
        data,
        "setMatchMap",
        ({ key, count }: { key: number; count: number }) => {}
      ),
    [data]
  );
  const { findCharacterLocation } = useFindChunk();

  const applyExtraStyles = useMemo(
    () => index <= visibleStartIndex + 1,
    [visibleStartIndex, index]
  );
  const mapCharacters = useMemo(
    () => index <= visibleStartIndex + 3,
    [visibleStartIndex, index]
  );

  let currentMatches = 0;
  const handleSetMatchMap = useCallback(
    (count: number) => {
      setMatchMap({ key: index, count: count });
    },
    [setMatchMap, index]
  );

  return (
    <StyledContainer id={`line-item-${index}`}>
      {mapCharacters ? (
        <StyledFlexContainer style={style} key={uniqueId()}>
          <>
            {map(text, (character, charIndex) => {
              const currentCharIndex = charIndex + lineFirstCharIndex;
              const result = findCharacterLocation({
                stringArray: inputArray,
                characterLocation: parseInt(currentCharIndex, 10),
              });
              const inputValue = result?.character || "";

              if (
                index === visibleStartIndex &&
                currentCharIndex <= inputIndex
              ) {
                if (character === inputValue) {
                  currentMatches += 1;
                  handleSetMatchMap(currentMatches);
                }
              }

              return (
                <>
                  {applyExtraStyles ? (
                    <StyledInnerFlexContainer key={uniqueId()}>
                      <StyledCharacter
                        inputIndex={inputIndex}
                        index={currentCharIndex}
                        inputValue={inputValue}
                        character={character}
                        id={`text-item-${currentCharIndex}`}
                      >
                        {character}
                      </StyledCharacter>
                      <StyledInputValueContainer
                        currentCharIndex={currentCharIndex}
                        inputIndex={inputIndex}
                      >
                        {currentCharIndex === inputIndex + 1 ? (
                          <StyledCursor>_</StyledCursor>
                        ) : (
                          result?.character
                        )}
                      </StyledInputValueContainer>
                    </StyledInnerFlexContainer>
                  ) : (
                    <div id={`text-item-${currentCharIndex}`}>{character}</div>
                  )}
                </>
              );
            })}
          </>
        </StyledFlexContainer>
      ) : (
        <div style={style} key={uniqueId()}>
          {text}
        </div>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  `
  color: ${theme["white"]};
`
);

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
    display: flex;
  `
);

const StyledInnerFlexContainer = styled(
  "div",
  `
    display: flex;
    flex-direction: column;
`
);

const StyledCursor = styled(
  "div",
  () =>
    `
      animation: blink 1s steps(1, start) infinite;
    `
);
