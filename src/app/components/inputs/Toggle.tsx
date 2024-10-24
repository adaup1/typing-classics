import React from "react";
import { styled } from "next-yak";
import { theme } from "@/app/theme";

export const Toggle = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <ToggleWrapper>
      <ToggleInput type="checkbox" id="toggle" {...props} />
      <ToggleLabel htmlFor="toggle" />
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const ToggleLabel = styled.label`
  display: inline-block;
  width: 50px;
  height: 24px;
  background-color: ${() => theme.white};
  border-radius: 24px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${() => theme.gray};
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }

  input:checked + &::after {
    background-color: ${() => theme.green};
    transform: translateX(26px);
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;
