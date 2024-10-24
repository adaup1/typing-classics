"use client";

import React from "react";
import map from "lodash/map";
import { theme } from "@/app/theme";
import { styled } from "next-yak";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string | number; label: string }[];
}

export const Select = ({ options, ...restOfProps }: SelectProps) => {
  return (
    <StyledSelect {...restOfProps}>
      {map(options, (option) => (
        <StyledOption key={option.value} value={option.value}>
          {option.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  display: block;
  font-size: 16px;
  font-family: inherit;
  font-weight: 700;
  color: ${() => theme.black};
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 12rem;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background-color: ${() => theme.white};

  &:focus-visible {
    outline: none;
  }
`;

const StyledOption = styled.option`
  color: green;
  background: red;
  font-family: inherit;
`;
