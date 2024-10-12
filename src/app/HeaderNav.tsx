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
        <StyledLogoContainer>Typing Classics</StyledLogoContainer>
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

const StyledLogoContainer = styled(
  "div",
  `
    color: ${theme["darkerPurple"]};
    font-weight: 700;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: default;
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
  }

  // &:hover {
  //   color: ${theme["gray"]};
  // }
`
);
