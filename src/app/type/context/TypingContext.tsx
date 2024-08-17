"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
  ReactNode,
  ComponentType,
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
});

interface TypingContextProviderProps {
  children: ReactNode;
}

interface countCharProps {
  countType: countType;
  characterCount: number;
}

export const TypingContextProvider = ({
  children,
}: TypingContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

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

  const value = { state, dispatch, countChar };

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};

export const useTypingContext = () => useContext(TypingContext);

export const withTypingContextProvider = <P extends object>(
  Component: ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    return (
      <TypingContextProvider>
        <Component {...props} />
      </TypingContextProvider>
    );
  };

  WrappedComponent.displayName = `withTypingContextProvider(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};
