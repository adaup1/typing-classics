import React, { useState, ReactNode } from "react";
import { styled } from "next-yak";
import { theme } from "@/app/theme";

interface TooltipProps {
  tip: () => ReactNode;
  children: ReactNode;
}

export const Tooltip = ({ tip, children }: TooltipProps) => {
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

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

interface ExtraProps {
  visible: boolean;
}

const TooltipNodeContainer = styled.div<ExtraProps>`
  width: max-content;
  max-width: calc(100vw - 4rem);
  position: absolute;
  right: 95%;
  bottom: 0;
  background-color: ${() => theme.ultraDarkPurple};
  color: ${() => theme.white};
  padding: 0.5rem;
  border-radius: 0.5rem;
  white-space: pre-wrap;
  z-index: 9;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  filter: drop-shadow(0px 8px 4px #000000b8);
  transition: opacity 3s ease-in-out;

  @media (max-width: 1300px) {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    bottom: 120%;
  }
`;
