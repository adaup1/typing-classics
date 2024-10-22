"use client";

import { useCallback, useMemo } from "react";
import { ListChildComponentProps } from "react-window";
import get from "lodash/get";
import map from "lodash/map";
import uniqueId from "lodash/uniqueId";
import { theme } from "@/app/theme";
import { useFindChunk } from "./hooks/useFindChunk";
import { useMatchCharacters } from "./hooks/useMatchCharacters";
import { styled } from "next-yak";

export const Row = ({ data, index, style }: ListChildComponentProps) => {
  const { text, lineFirstCharIndex } = useMemo(
    () => get(data, ["lines", index], {}),
    [data, index]
  );
  const inputIndex = useMemo(() => get(data, "inputIndex", -1), [data]);
  const inputArray = useMemo(() => get(data, "inputArray", [""]), [data]);
  const easySpecialCharacters = useMemo(
    () => get(data, "easySpecialCharacters", false),
    [data]
  );
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
  const { matchCharacters } = useMatchCharacters({
    easySpecialCharacters,
  });

  const applyExtraStyles = useMemo(
    () => index <= visibleStartIndex + 1,
    [visibleStartIndex, index]
  );
  const mapCharacters = useMemo(
    () => index <= visibleStartIndex + 3,
    [visibleStartIndex, index]
  );

  let currentMatches = 0;
  // New line isn't captured as correct character so we have to spoof it
  if (index > 1) {
    currentMatches = 1;
  }
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
              const currentCharIndex =
                parseInt(charIndex, 10) + lineFirstCharIndex;
              const result = findCharacterLocation({
                stringArray: inputArray,
                characterLocation: parseInt(currentCharIndex, 10),
              });
              const inputValue = result?.character || "";

              const charactersMatch = matchCharacters({
                inputCharacter: inputValue,
                characterToMatch: character,
              });

              if (
                index === visibleStartIndex &&
                currentCharIndex <= inputIndex
              ) {
                if (charactersMatch) {
                  currentMatches += 1;
                  if (currentCharIndex === inputIndex) {
                    handleSetMatchMap(currentMatches);
                  }
                }
              }

              return (
                <div key={uniqueId()}>
                  {applyExtraStyles ? (
                    <StyledInnerFlexContainer>
                      <StyledCharacter
                        inputIndex={inputIndex}
                        index={currentCharIndex}
                        charactersMatch={charactersMatch}
                        id={`text-item-${currentCharIndex}`}
                      >
                        {character}
                      </StyledCharacter>
                      <StyledInputValueContainer>
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
                </div>
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

console.log("theme", theme["white"]);

const StyledContainer = styled.div`
  color: ${() => theme["white"]};
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

interface StyledCharacterProps {
  index: number;
  inputIndex: number;
  charactersMatch: boolean;
}

const StyledCharacter = styled.div<StyledCharacterProps>`
  background-color: ${({ index, inputIndex, charactersMatch }) =>
    index <= inputIndex
      ? charactersMatch
        ? theme["green"]
        : theme["red"]
      : "transparent"};
`;

const StyledInputValueContainer = styled.div`
  color: ${() => theme["gray"]};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
`;

const StyledInnerFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCursor = styled.div`
  animation: blink 1s steps(1, start) infinite;
`;
