import React, { useEffect, useState, useRef, useMemo } from "react";

interface UseUpdateContextInputProps {
  setContextState: any;
  inputArray: Array<string>;
  inputIndex: number;
}

export const useUpdateContextInput = ({
  setContextState,
  inputArray,
  inputIndex,
}: UseUpdateContextInputProps) => {
  const [delay, setDelay] = useState(1000);

  // Refs to store the current inputArray and inputIndex without triggering re-renders
  const inputArrayRef = useRef(inputArray);
  const inputIndexRef = useRef(inputIndex);
  const delayRef = useRef(delay);

  useEffect(() => {
    // Update the refs when inputArray and inputIndex change
    inputArrayRef.current = inputArray;
    inputIndexRef.current = inputIndex;
  }, [inputArray, inputIndex]);

  useEffect(() => {
    delayRef.current = delay;
  }, [delay]);

  useEffect(() => {
    if (inputIndex > 2000 && delay !== 3000) {
      setDelay(3000);
    }
  }, [delay, inputIndex]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setContextState({
          inputArray: inputArrayRef.current,
          inputIndex: inputIndexRef.current,
        }),

      delay
    );
    return () => clearInterval(interval);
  }, [delay, setContextState]);
};
