import { styled } from "css-template-components/server";
import { theme } from "./theme";
import Link from "next/link";

export default function HeaderNav() {
  return (
    <StyledHeader>
      <StyledFlexContainer>
        <StyledNavLeft>
          <StyledLink href="/">Home</StyledLink>
          <StyledLink href="/books">Books</StyledLink>
        </StyledNavLeft>
        <StyledLogoLink href="/">
          <StyledLogo>Typing Classics</StyledLogo>
        </StyledLogoLink>
        <StyledNavRight>
          <StyledLink href="/">Sign In</StyledLink>
        </StyledNavRight>
      </StyledFlexContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled(
  "div",
  `
    height: 3.5rem;
    width: 100%;
    background-color: ${theme["white"]};
 `
);

const StyledFlexContainer = styled(
  "div",
  `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`
);

const StyledLogoLink = styled(
  Link,
  `
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  > a {
    text-decoration: none;
    color: ${theme["darkerPurple"]};
  }
  
`
);

const StyledLogo = styled(
  "h1",
  `
  font-weight: 700;
  font-size: 1.5rem;
`
);

const StyledNavLeft = styled(
  "div",
  `
    display: flex;
    gap: 1rem;
`
);

const StyledNavRight = styled(
  "div",
  `
    display: flex;
    gap: 1rem;
`
);

const StyledLink = styled(
  Link,
  `
  a {
    color: ${theme["darkerPurple"]};
    text-decoration: none;
    font-size: 1.25rem;
  }

  &:hover {
    color: ${theme["gray"]};
  }
`
);
