import { styled } from "next-yak";
import { theme } from "./theme";
import Link from "next/link";
import { TypingClassicsLogo } from "./components/svg/TypingClassicsLogo";
import { nunitoSans } from "./theme/fonts";

export default function HeaderNav() {
  return (
    <StyledHeader>
      <StyledFlexContainer>
        <StyledNavLeft>
          <StyledLink href="/">Home</StyledLink>
          <StyledLink href="/books">Books</StyledLink>
        </StyledNavLeft>
        <StyledLogoLink href="/">
          <StyledLogoLeft>TYPING</StyledLogoLeft>
          <StyledSVGContainer>
            <StyledSVG color={theme.darkerPurple} secondaryColor={theme.gray} />
          </StyledSVGContainer>
          <StyledLogoRight>
            <StyledSpan>C</StyledSpan>LASSICS
          </StyledLogoRight>
        </StyledLogoLink>
        <StyledNavRight>
          {/* <StyledLink href="/">Sign In</StyledLink> */}
        </StyledNavRight>
      </StyledFlexContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  height: 3.5rem;
  width: 100%;
  background-color: ${() => theme.white};
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem;
`;

const StyledLogoLink = styled(Link)`
  position: absolute;
  width: 30rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${() => nunitoSans.style.fontFamily}, sans-serif;
  display: flex;
  justify-content: center;
  align-items: normal;
  text-decoration: none;
  color: ${() => theme.darkerPurple};
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
  gap: 1rem;
`;

const StyledNavRight = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: ${() => theme.darkerPurple};
  text-decoration: none;
  font-size: 1.25rem;

  &:hover {
    color: ${() => theme.gray};
  }
`;

const StyledSVGContainer = styled.div`
  position: relative;
`;

const StyledSVG = styled(TypingClassicsLogo)`
  height: 2.5rem;
  width: fit-content;
  position: relative;
  bottom: 13%;
`;

const StyledSpan = styled.span`
  color: transparent;
  margin-left: -1rem;
`;
