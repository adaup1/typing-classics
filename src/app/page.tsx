import { styled } from "css-template-components/server";
import HeaderNav from "./HeaderNav";

export default function Home() {
  return (
    <>
      <HeaderNav />
      <StyledDiv name="frank">Hello there</StyledDiv>
      <StyledDiv name="dave">Hello there</StyledDiv>
    </>
  );
}

const StyledDiv = styled(
  "div",
  ({ name }) =>
    `
  background: ${name === "frank" ? "blue" : "yellow"};
`
);
