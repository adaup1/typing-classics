import { styled } from "css-template-components/server";
import { theme } from "./theme";
import Link from "next/link";
import { TypingClassicsLogo } from "./components/svg/TypingClassicsLogo";
import { TypingClassicsLogoWithTitle } from "./components/svg/TypingClassicsLogoWithTitle";

export default function HeaderNav() {
  return (
    <StyledHeader>
      <StyledFlexContainer>
        <StyledNavLeft>
          <StyledLink href="/">Home</StyledLink>
          <StyledLink href="/books">Books</StyledLink>
        </StyledNavLeft>
        <StyledLogoLink href="/">
          <div>
            <StyledLogoLeft>TYPING</StyledLogoLeft>
          </div>
          <div>
            {/* <StyledSVGTitle
              alt="Typing Classics logo"
              color={theme["darkerPurple"]}
              secondaryColor={theme["gray"]}
            /> */}
            <StyledSVG
              color={theme["darkerPurple"]}
              secondaryColor={theme["gray"]}
            />
          </div>
          <div>
            <StyledLogoRight>
              <StyledSpan>C</StyledSpan>LASSICS
            </StyledLogoRight>
          </div>
        </StyledLogoLink>
        <StyledNavRight>
          {/* <StyledLink href="/">Sign In</StyledLink> */}
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
    align-items: baseline;
    padding: 1rem;
`
);

const StyledLogoLink = styled(
  Link,
  `
  position: absolute;
  width: 30rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: __Raleway_88131f;

  > a {
    display: flex;
    justify-content: center;
    align-items: normal;
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

const StyledLogoLeft = styled(
  "div",
  `
  font-weight: 700;
  font-size: 1.5rem;
  margin-right: 0.7rem;
  position: relative;
  top: -4px;
`
);

const StyledLogoRight = styled(
  "div",
  `
  font-weight: 700;
  font-size: 1.5rem;
  margin-left: 0.1rem;
  position: relative;
  top: -4px;
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

const StyledSVGTitle = styled(
  TypingClassicsLogoWithTitle,
  `
  height: 100%;

  > svg {
    height: 2rem;
    width: fit-content;
  }
`
);

const StyledSVG = styled(
  TypingClassicsLogo,
  `
  height: 100%;

  > svg {
    height: 3rem;
    width: fit-content;
    position: relative;
    bottom: 22%;
  }
`
);

const StyledSpan = styled(
  "span",
  `
  color: transparent;
  margin-left: -1rem;
  `
);
