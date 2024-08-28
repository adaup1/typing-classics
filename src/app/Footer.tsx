import { styled } from "../../styled-system/jsx";

export default function Footer() {
  return <StyledFooter>footer</StyledFooter>;
}

const StyledFooter = styled("div", {
  base: {
    width: "100%",
    background: "lightgray",
  },
});
