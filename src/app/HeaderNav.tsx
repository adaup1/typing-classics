import { styled } from "css-template-components/server";

export default function HeaderNav() {
  return (
    <StyledHeader>
      <StyledFlexContainer>
        <div>Logo</div>
        <StyledNav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Settings</a>
        </StyledNav>
      </StyledFlexContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled(
  "div",
  `
    width: 100%;
    padding: 1rem;
    background-color: lightgray;
 `
);

const StyledFlexContainer = styled(
  "div",
  `
    display: flex;
    justify-content: space-between;
`
);

const StyledNav = styled(
  "div",
  `
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
`
);
