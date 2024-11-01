import React from "react";
import { styled } from "next-yak";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./components/buttons";
import Link from "next/link";

export default function NotFound() {
  return (
    <StyledContainer>
      <FontAwesomeIcon icon={faGhost} height={"4rem"} />
      <div>404 Page Not Found</div>
      <StyledDiv>
        <Link href="/">
          <StyledButton text="Return Home" />
        </Link>
      </StyledDiv>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 7rem);
  font-size: 4rem;
  gap: 1rem;
`;

const StyledDiv = styled.div`
  margin-top: -1rem;
`;

const StyledButton = styled(Button)`
  font-size: 2rem !important;
`;
