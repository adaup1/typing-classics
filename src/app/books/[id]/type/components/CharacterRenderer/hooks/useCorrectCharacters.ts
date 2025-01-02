import { useMemo } from "react";
import { useMatchMapStore } from "./useMatchMapStore";

export const useCorrectCharacters = () => {
  const { matchMap } = useMatchMapStore();

  const correctCharacters = useMemo(() => {
    let total = 0;
    matchMap.forEach((value) => {
      total += value;
    });
    return total;
  }, [matchMap]);

  return { correctCharacters };
};
