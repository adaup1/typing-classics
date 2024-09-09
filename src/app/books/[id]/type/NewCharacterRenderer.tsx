"use client";

import React, { useState, useCallback, useMemo } from "react";
import VirtualizedText from "@/app/components/lists/VirtualizedText";
import { AlwaysFocussedInput } from "@/app/components/inputs";
import { useDebounce } from "@/app/helpers/hooks";

export const CharacterRenderer = ({ text }: { text: string }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const inputIndex = useMemo(() => inputValue.length - 1, [inputValue.length]);

  const debouncedChange = useDebounce(
    (value: string) => setDebouncedValue(value),
    150
  );

  const handleOnInputChange = useCallback(
    (e: { target: { value: any } }) => {
      const { value } = e.target;
      setInputValue(value);
      debouncedChange(value);
    },
    [debouncedChange]
  );

  return (
    <div>
      <VirtualizedText
        text={text}
        inputIndex={inputIndex}
        inputValue={inputValue}
      />
      <AlwaysFocussedInput value={inputValue} onChange={handleOnInputChange} />
    </div>
  );
};
