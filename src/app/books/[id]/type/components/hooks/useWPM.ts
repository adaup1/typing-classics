import { useMemo } from "react";
import { useTypingContext } from "../../context/TypingContext";

export const useWPM = () => {
  const { state } = useTypingContext();
  const { correctCharacters, time } = state;

  // Average word is 5 characters
  const words = useMemo(() => correctCharacters / 5, [correctCharacters]);
  const minutes = useMemo(() => time / 60, [time]);

  const wpm = useMemo(() => Math.round(words / minutes) || 0, [words, minutes]);

  return { wpm };
};
