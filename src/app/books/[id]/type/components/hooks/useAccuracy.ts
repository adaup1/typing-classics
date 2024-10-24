import { useEffect, useRef } from "react";

interface UseAccuracyProps {
  inputIndex: number;
  correctCharacters: number;
}

export const useAccuracy = ({
  inputIndex,
  correctCharacters,
}: UseAccuracyProps) => {
  const accuracyRef = useRef(0);

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
  }, [correctCharacters, inputIndex]);

  return { accuracy: accuracyRef.current };
};
