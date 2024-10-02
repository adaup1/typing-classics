import { styled } from "css-template-components/server";
import { theme } from "./theme";
import Link from "next/link";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderNav() {
  return (
    <StyledHeader>
      <StyledFlexContainer>
        <StyledNav>
          <StyledLink href="/">Home</StyledLink>
          <StyledLink href="/books">Books</StyledLink>
        </StyledNav>
        <StyledLogoContainer>Typing Classics</StyledLogoContainer>
        <StyledNav>
          <StyledLink href="/">Sign In</StyledLink>
          {/* <FontAwesomeIcon icon={faUser} color={theme["darkerPurple"]} /> */}
        </StyledNav>
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
    padding: 1rem;
`
);

const StyledLogoContainer = styled(
  "div",
  `
  color: ${theme["darkerPurple"]};
  font-weight: 700;
`
);

const StyledNav = styled(
  "div",
  `
    display: flex;
    justify-content: space-between;
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

  :hover {
    color: ${theme["gray"]};
  }
`
);
