import React, { useState, ReactNode } from "react";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";

interface TooltipProps {
  tip: string | ReactNode;
  children: ReactNode;
}

export const Tooltip = ({ tip, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <TooltipNodeContainer visible={visible}>{tip()}</TooltipNodeContainer>
    </TooltipContainer>
  );
};

const TooltipContainer = styled(
  "div",
  `
  position: relative;
  display: inline-block;
`
);

const TooltipNodeContainer = styled(
  "div",
  ({ visible }: { visible: boolean }) => `
  width: max-content;
  max-width: calc(100vw - 2rem);
  position: absolute;
  right: 95%;
  bottom: 0;
  background-color: ${theme["ultraDarkPurple"]};
  color: ${theme["white"]};
  padding: 0.5rem;
  border-radius: 0.5rem;
  white-space: pre-wrap;
  z-index: 5;
  visibility: ${visible ? "visible" : "hidden"};
  filter: drop-shadow(0px 8px 4px #000000b8);
  transition: opacity 3s ease-in-out;
`
);
