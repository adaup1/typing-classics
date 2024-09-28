import { useCallback, useRef } from "react";
import { useTypingContext } from "../../context/TypingContext";

export const useWPM = ({ time }: { time: number }) => {
  const { state } = useTypingContext();
  const correctCharactersRef = useRef(state.correctCharacters);

  // const { correctCharacters, time } = state;

  const getWpm = useCallback(() => {
    const words = correctCharactersRef.current / 5;
    const minutes = time / 60;
    return Math.round(words / minutes) || 0;
  }, []);

  return { getWpm };
};
