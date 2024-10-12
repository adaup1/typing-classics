import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  version: string;
}

export const Button = ({
  text,
  version = "primary",
  ...restOfProps
}: ButtonProps) => {
  return (
    <StyledButton version={version} {...restOfProps}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(
  "button",
  ({ version, disabled }: { version: string; disabled: boolean }) => {
    if (version === "secondary") {
      return `
        color: ${disabled ? theme["gray"] : theme["white"]};
        background: none; 
        border: none; 
        cursor: ${disabled ? "default" : "pointer"};
        font-family: inherit;
        font-size: 1rem;  
        border-bottom: 1px solid transparent;

        &:hover {
            border-bottom: ${disabled ? "1px" : `1px solid ${theme["white"]}`};  
        }
    `;
    }

    // default to primary
    return `
        color: ${theme["white"]};
        background: ${theme["darkerPurple"]};
        font-family: inherit;
        font-size: 1rem;   
    `;
  }
);
