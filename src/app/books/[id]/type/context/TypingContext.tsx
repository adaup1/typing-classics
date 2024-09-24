"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
  ReactNode,
  ComponentType,
  useMemo,
} from "react";
import {
  DEFAULT_STATE,
  actionTypes,
  TypingState,
  TypingContextProps,
  countType,
} from "./types.d";
import { reducer } from "./reducer";

const TypingContext = createContext<TypingContextProps>({
  state: DEFAULT_STATE,
  dispatch: () => {},
  countChar: () => {},
  updateInput: () => {},
  textLength: 0,
});

interface TypingContextProviderProps {
  children: ReactNode;
  text: string;
}

interface countCharProps {
  countType: countType;
  characterCount: number;
}

export const TypingContextProvider = ({
  children,
  text = "",
}: TypingContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const textLength = useMemo(() => text.length, [text]);

  const updateInput = useCallback(
    ({
      inputArray,
      inputIndex,
    }: {
      inputArray: Array<string>;
      inputIndex: number;
    }) => {
      dispatch({
        type: actionTypes.updateInput,
        inputArray,
        inputIndex,
      });
    },
    []
  );

  const countChar = useCallback(
    ({ countType, characterCount }: countCharProps) => {
      dispatch({
        type: actionTypes.countChar,
        countType,
        characterCount,
      });
    },
    []
  );

  const value = { state, dispatch, countChar, updateInput, textLength };

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};

export const useTypingContext = () => useContext(TypingContext);
