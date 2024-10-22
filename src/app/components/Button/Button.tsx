import { styled } from "next-yak";
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

interface StyledButtonProps {
  version: string;
  disabled: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  color: ${({ version, disabled }) => {
    if (version === "secondary") {
      return disabled ? theme["gray"] : theme["white"];
    }
    return disabled ? theme["ultraDarkPurple"] : theme["darkerPurple"];
  }};
  background: ${({ version, disabled }) => {
    if (version === "secondary") {
      return "none";
    }
    return disabled ? theme["gray"] : theme["white"];
  }};
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  font-family: inherit;
  font-size: 1rem;
  border-bottom: ${({ version }) =>
    version === "secondary" ? "1px solid transparent" : "none"};
  padding: ${({ version }) => (version === "secondary" ? 0 : "0.5rem")};
  filter: ${({ version }) =>
    version === "secondary"
      ? "none"
      : `drop-shadow(0px 8px 4px ${theme["ultraDarkPurple"]})`};

  &:hover {
    color: ${({ version }) =>
      version === "secondary" ? theme["white"] : theme["gray"]};
    border-bottom: ${({ version, disabled }) => {
      if (version === "secondary") {
        return disabled ? "1px" : `1px solid ${theme["white"]}`;
      }
      return "none";
    }};
  }
`;
