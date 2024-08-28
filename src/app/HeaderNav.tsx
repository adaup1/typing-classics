import { styled } from "@panda/jsx";

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

const StyledHeader = styled("div", {
  base: {
    width: "100%",
    padding: "1rem",
  },
});

const StyledFlexContainer = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const StyledNav = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-evenly",
    gap: "1rem",
  },
});
