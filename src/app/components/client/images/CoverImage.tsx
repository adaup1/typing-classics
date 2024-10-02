"use client";

import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";

export const CoverImage = ({
  width,
  height,
  ...restOfProps
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <StyledImgContainer width={width} height={height}>
      <StyledImg {...restOfProps} height={height} />
    </StyledImgContainer>
  );
};

const StyledImgContainer = styled(
  "div",
  ({ width = "12rem", height = "12rem" }: { width: string; height: string }) =>
    `
    width: ${width};
    height: ${height};
`
);

const StyledImg = styled(
  "img",
  `
    height: inherit;
  	object-fit: cover;
    object-position: top;
    width: inherit;
    filter: drop-shadow(0 0 0.2rem ${theme["gray"]});
    border-radius: 0.5rem;
`
);
