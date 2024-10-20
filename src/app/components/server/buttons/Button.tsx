import { styled } from "css-template-components/server";
import { theme } from "@/app/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  version?: string;
  disabled?: boolean;
}

export const Button = ({
  text,
  version = "primary",
  disabled = false,
  ...restOfProps
}: ButtonProps) => {
  return (
    <StyledButton version={version} disabled={disabled} {...restOfProps}>
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
        color: ${disabled ? theme["ultraDarkPurple"] : theme["darkerPurple"]};
        background: ${disabled ? theme["gray"] : theme["white"]};
        font-family: inherit;
        font-size: 1rem;  
        border: none; 
        padding: 0.5rem;
        font-weight: 600;
        border-radius: 0.5rem;
        cursor: ${disabled ? "default" : "pointer"};
        filter: drop-shadow(0px 8px 4px ${theme["ultraDarkPurple"]});

        &:hover {
            color: ${theme["gray"]}; 
        }
    `;
  }
);
