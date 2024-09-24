import { useMemo } from "react";
import { useTypingContext } from "../../context/TypingContext";

export const useAccuracy = () => {
  const { state } = useTypingContext();
  const { inputIndex, correctCharacters } = state;

  const accuracy = useMemo(() => {
    const totalCharacters = inputIndex + 1;
    if (correctCharacters > 0 && totalCharacters > 0) {
      return Math.round((correctCharacters / totalCharacters) * 100);
    }
    return 0;
  }, [correctCharacters, inputIndex]);

  return { accuracy };
};
