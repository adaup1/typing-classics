import { styled } from "css-template-components/server";

export default function Home() {
  return (
    <>
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
