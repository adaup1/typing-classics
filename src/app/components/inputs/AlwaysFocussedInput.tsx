"use client";

import React, { useRef, useEffect } from "react";

export const AlwaysFocussedInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleBlur = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("blur", handleBlur);
      inputElement.focus();
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return <input ref={inputRef} {...props} />;
};
