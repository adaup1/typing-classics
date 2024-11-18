import { styled } from "next-yak";
import { theme } from "../theme";
import Link from "next/link";
import { TypingClassicsLogo } from "../components/svg/TypingClassicsLogo";
import { nunitoSans } from "../theme/fonts";
import { faBook, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MobileMenu } from "./MobileMenu";

export default function HeaderNav() {
  return (
    <StyledHeader>
      <StyledDesktopNav>
        <StyledNavLeft>
          <StyledLink href="/">
            {/* <FontAwesomeIcon icon={faHouse} height={"1rem"} /> */}
            HOME
          </StyledLink>
          <StyledLink href="/books">
            {/* <FontAwesomeIcon icon={faBook} height={"1rem"} /> */}
            BOOKS
          </StyledLink>
          <StyledLink href="/faq">FAQ</StyledLink>
        </StyledNavLeft>
        <StyledLogoLink href="/">
          <StyledLogoLeft>TYPING</StyledLogoLeft>
          <StyledSVGContainer>
            <StyledSVG color={theme.purple} secondaryColor={theme.gray} />
          </StyledSVGContainer>
          <StyledLogoRight>
            <StyledSpan>C</StyledSpan>LASSICS
          </StyledLogoRight>
        </StyledLogoLink>
        <StyledNavRight>
          {/* <StyledLink href="/">Sign In</StyledLink> */}
        </StyledNavRight>
      </StyledDesktopNav>
      <StyledMobileMenuContainer>
        <MobileMenu />
      </StyledMobileMenuContainer>
    </StyledHeader>
  );
}

const StyledDesktopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem;
`;

const StyledMobileMenuContainer = styled.div`
  display: none;
  height: 100%;
  width: 100%;
`;

const StyledHeader = styled.div`
  height: 3.5rem;
  width: 100%;
  background-color: ${() => theme.white};
  position: relative;
  z-index: 10;

  @media (max-width: 800px) {
    ${StyledDesktopNav} {
      display: none;
    }
    ${StyledMobileMenuContainer} {
      display: flex;
    }
  }
`;

const StyledLogoLink = styled(Link)`
  position: absolute;
  width: fit-content;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${() => nunitoSans.style.fontFamily}, sans-serif;
  display: flex;
  justify-content: center;
  align-items: normal;
  text-decoration: none;
  color: ${() => theme.purple};
`;

const StyledLogoLeft = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-right: 0.7rem;
  position: relative;
  top: -4px;
`;

const StyledLogoRight = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-left: 0.1rem;
  position: relative;
  top: -4px;
`;

const StyledNavLeft = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledNavRight = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: ${() => theme.purple};
  text-decoration: none;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;

  &:hover {
    color: ${() => theme.gray};
  }
`;

const StyledSVGContainer = styled.div`
  position: relative;
`;

const StyledSVG = styled(TypingClassicsLogo)`
  height: 2rem;
  width: fit-content;
  position: relative;
  bottom: 7%;
`;

const StyledSpan = styled.span`
  color: transparent;
  margin-left: -1rem;
`;
