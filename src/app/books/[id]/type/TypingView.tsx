"use client";

import { useCallback } from "react";
import { actionTypes, countType } from "./context/types.d";
import { CharacterRenderer } from "./NewCharacterRenderer";
import {
  withTypingContextProvider,
  useTypingContext,
} from "./context/TypingContext";

const TypingView = ({ text }: { text: string }) => {
  const { state, dispatch, countChar } = useTypingContext();

  const onCountAllChar = useCallback(() => {
    countChar({
      countType: countType.allCharacters,
      characterCount: state.correctCharacters + 1,
    });
  }, [countChar, state.correctCharacters]);

  const onCountCorrectChar = useCallback(() => {
    countChar({
      countType: countType.correctCharacters,
      characterCount: state.correctCharacters + 1,
    });
  }, [countChar, state.correctCharacters]);

  return (
    <>
      <CharacterRenderer text={text} />
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
