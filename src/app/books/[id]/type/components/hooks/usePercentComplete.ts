import { useMemo } from "react";

interface UsePercentCompleteProps {
  inputIndex: number;
  textLength: number;
}

export const usePercentComplete = ({
  inputIndex,
  textLength,
}: UsePercentCompleteProps) => {
  const percentComplete = useMemo(() => {
    if (textLength === 0 || inputIndex < 1) {
      return "0.00%";
    }
    const percentage = ((inputIndex + 1) / textLength) * 100;
    return percentage.toFixed(2) + "%";
  }, [inputIndex, textLength]);

  return percentComplete;
};
