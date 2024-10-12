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
  TypingDispatchContextProps,
} from "./types.d";
import { reducer } from "./reducer";

const TypingContext = createContext<TypingContextProps>({
  state: DEFAULT_STATE,
});

const TypingDispatchContext = createContext<TypingDispatchContextProps>({
  dispatch: () => {},
});

interface TypingContextProviderProps {
  children: ReactNode;
}

export const TypingContextProvider = ({
  children,
}: TypingContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  console.log("the state", state);
  const value = { state };
  const dispatchValue = { dispatch };

  return (
    <TypingContext.Provider value={value}>
      <TypingDispatchContext.Provider value={dispatchValue}>
        {children}
      </TypingDispatchContext.Provider>
    </TypingContext.Provider>
  );
};

export const useTypingContext = () => useContext(TypingContext);

export const useTypingDispatchContext = () => useContext(TypingDispatchContext);
