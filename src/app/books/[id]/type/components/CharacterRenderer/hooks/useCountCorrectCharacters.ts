import { useState, useRef, useMemo, useCallback } from "react";

export const useCountCorrectCharacters = () => {
  const matchRef = useRef(new Map());
  const [matchMap, setMatchMap] = useState(new Map());

  const handleSetMatchMap = useCallback(
    ({ key, count }: { key: number; count: number }) => {
      if (matchRef.current.get(key) !== count) {
        matchRef.current.set(key, count);

        setMatchMap((prevMatchMap) => {
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

  const correctCharacters = useMemo(() => {
    let total = 0;
    matchMap.forEach((value) => {
      total += value;
    });
    return total;
  }, [matchMap]);

  return {
    setMatchMap: handleSetMatchMap,
    matchMap,
    correctCharacters,
  };
};
