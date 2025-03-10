"use client";

import React, { useRef, useEffect } from "react";
import { useIsIOS } from "@/app/helpers/hooks";

const blockAction = (e) => {
  e.preventDefault();
  return false;
};

export const AlwaysFocussedInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isIOS = useIsIOS();

  useEffect(() => {
    const handleFocus = () => {
      if (inputRef.current) {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    };

    const handleBlur = () => {
      if (inputRef.current) {
        if (isIOS) {
          inputRef.current.click();
        } else {
          inputRef.current.focus();
        }
      }
    };

    const handleInput = () => {
      if (inputRef.current) {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    };

    const handleKeyDown = () => {
      if (inputRef.current) {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
      inputElement.addEventListener("input", handleInput);
      inputElement.addEventListener("keydown", handleKeyDown);
      if (isIOS) {
        inputElement.click();
      } else {
        inputElement.focus();
      }
      handleFocus();
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
        inputElement.removeEventListener("input", handleInput);
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isIOS]);

  return (
    <input
      ref={inputRef}
      {...props}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      onPaste={blockAction}
      onCopy={blockAction}
      onDrag={blockAction}
      onDrop={blockAction}
    />
  );
};
