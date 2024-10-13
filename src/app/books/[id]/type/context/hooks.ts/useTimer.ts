import { useEffect, useState, useRef, useMemo } from "react";

export const useTimer = ({
  correctCharacters,
}: {
  correctCharacters: number;
}) => {
  const [time, setTime] = useState(0);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const correctCharactersRef = useRef(correctCharacters);
  const isPausedRef = useRef(isPaused); // Ref to track the latest isPaused value
  const timeRef = useRef(0); // Ref to track the latest time value
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    correctCharactersRef.current = correctCharacters;
  }, [correctCharacters]);

  // Sync the isPaused ref with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const handleKeyPress = () => {
      setIsPaused(false); // Start the timer when key is pressed
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      typingTimeout.current = setTimeout(() => {
        setIsPaused(true); // Pause after 2 seconds of inactivity
      }, 2000);
    };

    window.addEventListener("keydown", handleKeyPress);

    const newTimerInterval = setInterval(() => {
      if (!isPausedRef.current) {
        // Only update time when not paused
        timeRef.current += 1;
        setTime(timeRef.current); // Update the state based on ref

        const words = correctCharactersRef.current / 5;
        const minutes = timeRef.current / 60;
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
  }, []);

  const formattedTime = useMemo(
    () => new Date(time * 1000).toISOString().slice(11, 19),
    [time]
  );

  return { time, formattedTime, isPaused, wpm };
};
