import { useMemo, useEffect, useRef } from "react";
import { useTypingContext } from "../../context/TypingContext";
import { usePrevious } from "@/app/helpers/hooks";

interface UseAccuracyProps {
  inputIndex: number;
  correctCharacters: number;
}

export const useAccuracy = ({
  inputIndex,
  correctCharacters,
}: UseAccuracyProps) => {
  // const { state } = useTypingContext();
  const accuracyRef = useRef(0);
  const previousInputIndex = usePrevious(inputIndex);

  useEffect(() => {
    const totalCharacters = inputIndex + 1;
    if (
      totalCharacters > 0 &&
      correctCharacters > 0 &&
      correctCharacters <= totalCharacters
    ) {
      accuracyRef.current = Math.round(
        (correctCharacters / totalCharacters) * 100
      );
    }
    //}
  }, [correctCharacters, inputIndex]);

  return { accuracy: accuracyRef.current };
};
