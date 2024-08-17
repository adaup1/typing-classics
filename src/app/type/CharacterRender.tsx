// @ts-nocheck

import React, {
  useCallback,
  useMemo,
  // useRef,
  useEffect,
} from "react";
import styled from "styled-components";
import { FixedSizeList } from "react-window";
import { useDebounce, usePrevious } from "../helpers/hooks";
import { actionTypes, countType } from "./context/types.d";
import { useTypingContext } from "./context/TypingContext";
import { romeoAndJuliet } from "../dummydata/romeoJuliet";

// const text =
//   "hello there here is some text. I would appreciate it if you typed this text correctly";

const text = romeoAndJuliet.text;

interface LetterProps {
  index: number;
  style: any;
  data: any;
}

const Letter = ({ index, style, data }: LetterProps) => {
  return (
    <StyledLetterContainer
      className={index % 2 ? "ListItemOdd" : "ListItemEven"}
      style={style}
    >
      <StyledSpan
        index={index}
        data={data}
        //@ts-ignore
        text={text}
        id={`text-item-${index}`}
      >
        {text[index]}
      </StyledSpan>
    </StyledLetterContainer>
  );
};

export const CharacterRenderer = () => {
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
  }, [stateLetter.stateIndex]);

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
      <StyledFixedSizeList
        className="List"
        height={32}
        itemCount={text.length}
        itemSize={20}
        layout="horizontal"
        width={900}
        overscanCount={15}
        style={{ color: "#000000" }}
        itemData={{ stateLetter }}
        // ref={listRef}
      >
        {Letter}
      </StyledFixedSizeList>
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

const StyledFixedSizeList = styled(FixedSizeList)`
  border: solid black;
  padding: 1rem;
  overflow: hidden !important;
  display: flex;
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
