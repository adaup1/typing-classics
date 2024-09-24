import { useState, useRef, useMemo, useEffect } from "react";
import { useThrottle } from "@/app/helpers/hooks";
import { useTypingContext } from "../../../context/TypingContext";
import { actionTypes } from "../../../context/types.d";

export const useCountCorrectCharacters = () => {
  const { state, dispatch } = useTypingContext();
  const matchRef = useRef(new Map());
  const [matchMap, setMatchMap] = useState(new Map());
  const { throttle } = useThrottle();

  const handleSetMatchMap = throttle(
    ({ key, count }: { key: number; count: number }) => {
      if (matchRef.current.get(key) !== count) {
        matchRef.current.set(key, count);

        // Update state by merging new key and count into existing state
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
    500
  ); // Throttle state updates to every 300ms

  const correctCharacters = useMemo(() => {
    let total = 0;
    matchMap.forEach((value) => {
      total += value;
    });
    return total;
  }, [matchMap]);

  useEffect(() => {
    dispatch({ type: actionTypes.countCorrectChar, correctCharacters });
  }, [correctCharacters]);

  return {
    setMatchMap: handleSetMatchMap,
    matchMap,
  };
};
