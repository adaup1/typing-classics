"use-client";

import React from "react";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";

export const CoverImage = ({ ...props }: HTMLImageElement) => {
  return (
    <StyledImgContainer>
      <StyledImg {...props} />
    </StyledImgContainer>
  );
};

const StyledImgContainer = styled(
  "div",
  `
    width: 16rem;
`
);

const StyledImg = styled(
  "img",
  `
  	object-fit: cover;
    width: 16rem;
    filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
    border-radius: 0.5rem;
`
);
