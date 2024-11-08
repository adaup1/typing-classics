"use client";

import { useState, useMemo, useCallback } from "react";
import { styled } from "next-yak";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../theme";
import Link from "next/link";

import React from "react";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuIcon = useMemo(() => (isOpen ? faCaretUp : faBars), [isOpen]);

  const handleOnClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <StyledMobileNav>
      <StyledIconContainer isOpen={isOpen} onClick={handleOnClick}>
        <FontAwesomeIcon icon={menuIcon} height={"2rem"} />
      </StyledIconContainer>
      {isOpen && (
        <StyledDropdown>
          <StyledDropdownItem href="/" onClick={handleOnClick}>
            HOME
          </StyledDropdownItem>
          <StyledDropdownItem href="/books" onClick={handleOnClick}>
            BOOKS
          </StyledDropdownItem>
          <StyledDropdownItem href="/faq" onClick={handleOnClick}>
            FAQ
          </StyledDropdownItem>
        </StyledDropdown>
      )}
    </StyledMobileNav>
  );
};

interface ExtraProps {
  isOpen: boolean;
}

const StyledMobileNav = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 2rem;
  cursor: pointer;
`;

const StyledIconContainer = styled.div<ExtraProps>`
  display: flex;
  cursor: pointer;
  justify-content: ${({ isOpen }) => (isOpen ? "center" : "flex-start")};
  width: 100%;

  color: ${() => theme.purple};

  &:hover {
    color: ${() => theme.gray};
  }
`;

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${() => theme.white};
  border-radius: 0 0 0.5rem 0.5rem;
  position: absolute;
  top: 3.5rem;
  left: 0;
  right: 0;
  z-index: 20;
  filter: drop-shadow(0px 8px 4px #000000b8);
`;

const StyledDropdownItem = styled(Link)`
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: ${() => theme.purple};
  padding: 1rem;
  border-top: ${() => theme.darkPurple} solid 1px;
  width: calc(100% - 4rem);
  font-weight: 500;

  &:hover {
    color: ${() => theme.gray};
  }
`;
