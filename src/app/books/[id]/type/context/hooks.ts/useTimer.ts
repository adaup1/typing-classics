import { useEffect, useState, useRef } from "react";
import { useTypingContext } from "../TypingContext";
import { actionTypes } from "../types.d";

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const { dispatch } = useTypingContext();

  useEffect(() => {
    const handleKeyPress = () => {
      setIsPaused(false);
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      typingTimeout.current = setTimeout(() => {
        setIsPaused(true);
      }, 2000);
    };

    window.addEventListener("keydown", handleKeyPress);

    const newTimerInterval = setInterval(() => {
      if (!isPaused) {
        setTime((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      clearInterval(newTimerInterval);
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPaused]);

  useEffect(() => {
    dispatch({ type: actionTypes.setTimer, time });
  }, [time]);

  return { time, isPaused };
};
