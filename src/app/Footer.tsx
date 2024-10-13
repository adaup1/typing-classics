import { styled } from "css-template-components/server";
import { theme } from "./theme";

export default function Footer() {
  return <StyledFooter>footer</StyledFooter>;
}

const StyledFooter = styled(
  "div",
  `
    height: 3.5rem;
    width: "100%";
    background: ${theme["white"]};
`
);
