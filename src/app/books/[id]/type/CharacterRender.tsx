// @ts-nocheck

import React, { useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { usePrevious, useDebounce } from "@/app/helpers/hooks";
import { actionTypes, countType } from "./context/types.d";
import { useTypingContext } from "./context/TypingContext";

interface LetterProps {
  columnIndex: number;
  rowIndex: number;
  style: any;
  data: any;
}

const Letter = ({ columnIndex, rowIndex, style, data }: LetterProps) => {
  const { text } = data;
  const index = rowIndex * data.columnCount + columnIndex;
  return (
    <StyledLetterContainer
      className={index % 2 ? "ListItemOdd" : "ListItemEven"}
      style={style}
    >
      <StyledSpan
        index={index}
        data={data}
        text={text}
        id={`text-item-${index}`}
      >
        {text[index]}
      </StyledSpan>
    </StyledLetterContainer>
  );
};

export const CharacterRenderer = ({ text }: { text: string }) => {
  const { state, dispatch } = useTypingContext();
  const previousInputState = usePrevious(state.input);

  const onUpdateState = useCallback(
    (newValue) => dispatch({ type: actionTypes.changeInput, input: newValue }),
    [dispatch]
  );

  const debouncedUpdateState = useDebounce(onUpdateState, 50);

  const stateLetter = useMemo(() => {
    const stateIndex = state.input.length - 1;
    const letter = state.input[stateIndex] || "";
    return { stateIndex, letter, state: state.input };
  }, [state]);

  const handleScroll = useCallback(() => {
    if (stateLetter.stateIndex <= text.length && stateLetter.stateIndex > 0) {
      document
        .getElementById(`text-item-${stateLetter.stateIndex}`)
        .scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [stateLetter.stateIndex, text.length]);

  const onCountAllChar = useCallback(() => {
    dispatch({
      type: actionTypes.countChar,
      countType: countType.allCharacters,
      characterCount: state.input.length,
    });
  }, [dispatch, state.input.length]);

  const onCountCorrectChar = useCallback(() => {
    const total = state.input
      .split("")
      .filter((char, index) => char === text[index]).length;
    dispatch({
      type: actionTypes.countChar,
      countType: countType.correctCharacters,
      characterCount: total,
    });
  }, [dispatch, state]);

  const handleOnInputChange = useCallback(
    (e) => {
      debouncedUpdateState(e.target.value);
    },
    [debouncedUpdateState]
  );

  useEffect(() => {
    if (state.input.length) {
      handleScroll();
    }
  }, [handleScroll, state.input.length]);

  useEffect(() => {
    if (state.input !== previousInputState) {
      onCountAllChar();
      onCountCorrectChar();
    }
  }, [onCountAllChar, onCountCorrectChar, previousInputState, state.input]);

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <StyledGrid
            columnCount={Math.floor(width / 20)}
            columnWidth={() => 20}
            height={height}
            rowCount={Math.ceil(text.length / Math.floor(width / 20))}
            rowHeight={() => 32}
            width={width}
            itemData={{
              stateLetter,
              text,
              columnCount: Math.floor(width / 20),
            }}
          >
            {Letter}
          </StyledGrid>
        )}
      </AutoSizer>
      <StyledInput
        onChange={handleOnInputChange}
        defaultValue={state.input}
        maxLength={text.length}
        spellCheck={false}
      />
    </>
  );
};

const StyledLetterContainer = styled.div`
  font-size: 1.5rem;
  font-family: monospace;
`;

const StyledGrid = styled(Grid)`
  border: solid black;
  padding: 1rem;
  overflow: hidden !important;
`;

const StyledInput = styled.input`
  width: 700px;
  font-size: 1.5rem;
  font-family: monospace;
  letter-spacing: 10px;
`;

interface SpanProps {
  index: number;
  data: any;
  text: [string];
}

const StyledSpan = styled.span<SpanProps>`
  display: block;
  width: 100%;
  padding-left: 3px;
  white-space: pre;
  background-color: ${({ index, data, text }) => {
    return index <= data.stateLetter.stateIndex
      ? text[index] === data.stateLetter.state[index]
        ? "green"
        : "red"
      : "transparent";
  }};
`;
