import { styled } from "css-template-components/server";
import { theme } from "@/app/theme";

export const CoverImage = ({
  width,
  ...restOfProps
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <StyledImgContainer width={width}>
      <StyledImg {...restOfProps} />
    </StyledImgContainer>
  );
};

const StyledImgContainer = styled(
  "div",
  ({ width = "20rem" }: { width: string }) =>
    `
    width: ${width};
`
);

const StyledImg = styled(
  "img",
  `
  	object-fit: cover;
    width: inherit;
    filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
    border-radius: 0.5rem;
`
);
