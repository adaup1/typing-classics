"use client";

import { useCallback } from "react";
import { actionTypes, countType } from "./context/types.d";
import {
  withTypingContextProvider,
  useTypingContext,
} from "./context/TypingContext";

const TypingView = () => {
  const { state, dispatch, countChar } = useTypingContext();

  const onCountAllChar = useCallback(() => {
    countChar({
      countType: countType.allCharacters,
      characterCount: state.correctCharacters + 1,
    });
  }, []);

  const onCountCorrectChar = useCallback(() => {
    countChar({
      countType: countType.correctCharacters,
      characterCount: state.correctCharacters + 1,
    });
  }, []);

  return (
    <>
      Hi there
      <div>
        <button onClick={onCountAllChar}>All Characters</button>
        {state.allCharacters}
      </div>
      <div>
        <button onClick={onCountCorrectChar}>Correct Characters</button>
        {state.correctCharacters}
      </div>
    </>
  );
};

export default withTypingContextProvider(TypingView);
