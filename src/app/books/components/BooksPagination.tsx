import React from "react";
import { styled } from "css-template-components/client";
import { Button } from "@/app/components/client/buttons/Button";

interface BooksPaginationProps {
  handleNextPage: () => void;
  handleLastPage: () => void;
  disableNextPage: boolean;
  disableLastPage: boolean;
}

export const BooksPagination = ({
  handleNextPage,
  handleLastPage,
  disableNextPage,
  disableLastPage,
}) => {
  return (
    <StyledFlexContainer>
      <Button
        onClick={handleLastPage}
        text="< Last Page"
        version="secondary"
        disabled={disableLastPage}
      />
      <Button
        onClick={handleNextPage}
        text="Next Page >"
        version="secondary"
        disabled={disableNextPage}
      />
    </StyledFlexContainer>
  );
};

const StyledFlexContainer = styled(
  "div",
  `
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 1rem;

`
);
