import { styled } from "next-yak";
import { theme } from "./theme";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledLabel>Copyright © 2024 Andrew Dauphinais</StyledLabel>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  height: 3.5rem;
  width: "100%";
  background: ${() => theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.div`
  color: ${() => theme.darkPurple};
  font-size: 1rem;
`;
