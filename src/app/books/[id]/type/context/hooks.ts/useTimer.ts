import { useEffect, useState, useRef, useMemo } from "react";
import { useTypingDispatchContext, useTypingContext } from "../TypingContext";
import { actionTypes } from "../types.d";

export const useTimer = ({
  correctCharacters,
}: {
  correctCharacters: number;
}) => {
  const [time, setTime] = useState(0);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const { dispatch } = useTypingDispatchContext();
  // const { state } = useTypingContext();
  const correctCharactersRef = useRef(correctCharacters);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    correctCharactersRef.current = correctCharacters;
  }, [correctCharacters]);

  useEffect(() => {
    const handleKeyPress = () => {
      setIsPaused(false);
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      typingTimeout.current = setTimeout(() => {
        console.log("please");
        setIsPaused(true);
      }, 2000);
    };

    window.addEventListener("keydown", handleKeyPress);

    const newTimerInterval = setInterval(() => {
      if (!isPaused) {
        setTime((prev) => prev + 1);
        const words = correctCharactersRef.current / 5;
        const minutes = time / 60;
        setWpm(minutes > 0 ? Math.round(words / minutes) : 0);
      }
    }, 1000);

    return () => {
      clearInterval(newTimerInterval);
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPaused, time]);

  // useEffect(() => {
  //   dispatch({ type: actionTypes.setTimer, time });
  // }, [dispatch]);

  const formattedTime = useMemo(
    () => new Date(time * 1000).toISOString().slice(11, 19),
    [time]
  );

  return { time, formattedTime, isPaused, wpm };
};
