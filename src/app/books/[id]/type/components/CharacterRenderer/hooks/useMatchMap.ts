import { useRef, useCallback } from "react";
import { useMatchMapStore } from "./useMatchMapStore";

export const useMatchMap = () => {
  const matchRef = useRef(new Map());
  const { matchMap, setMatchMap } = useMatchMapStore();

  const handleSetMatchMap = useCallback(
    ({ key, count }: { key: number; count: number }) => {
      if (matchRef.current.get(key) !== count) {
        matchRef.current.set(key, count);

        setMatchMap((prevMatchMap: Map<number, number>) => {
          const newMatchMap = new Map(prevMatchMap);
          newMatchMap.set(key, count);

          if (prevMatchMap.get(key) !== newMatchMap.get(key)) {
            return newMatchMap;
          } else {
            return prevMatchMap;
          }
        });
      }
    },
    [setMatchMap]
  );

  return {
    setMatchMap: handleSetMatchMap,
    matchMap,
  };
};
