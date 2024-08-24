"use client";

import React, { useState, useCallback, useMemo } from "react";
import VirtualizedText from "@/app/components/lists/VirtualizedText";
import { AlwaysFocussedInput } from "@/app/components/inputs";
import { useDebounce } from "@/app/helpers/hooks";

export const CharacterRenderer = ({ text }: { text: string }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const currentLetterIndex = useMemo(
    () => inputValue.length - 1,
    [inputValue.length]
  );

  const debouncedChange = useDebounce(
    (value: string) => setDebouncedValue(value),
    50
  );

  const handleOnInputChange = useCallback(
    (e) => {
      const { value } = e.target;
      setInputValue(value);
      debouncedChange(value);
    },
    [debouncedChange]
  );

  return (
    <div>
      <VirtualizedText text={text} currentLetterIndex={currentLetterIndex} />
      <AlwaysFocussedInput value={inputValue} onChange={handleOnInputChange} />
    </div>
  );
};
