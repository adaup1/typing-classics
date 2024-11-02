import { styled } from "next-yak";
import { theme } from "@/app/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  version?: string;
  disabled?: boolean;
  leftIcon?: any;
  rightIcon?: any;
}

export const Button = ({
  text,
  version = "primary",
  disabled = false,
  rightIcon,
  leftIcon,
  ...restOfProps
}: ButtonProps) => {
  return (
    <StyledButton version={version} disabled={disabled} {...restOfProps}>
      <StyledFlexContainer>
        {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
        <div>{text}</div>
        {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
      </StyledFlexContainer>
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
      return disabled ? theme.gray : theme.white;
    }
    return disabled ? theme.ultraDarkPurple : theme.darkerPurple;
  }};
  background: ${({ version, disabled }) => {
    if (version === "secondary") {
      return "none";
    }
    return disabled ? theme.gray : theme.white;
  }};
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  font-family: inherit;
  font-size: 1rem;
  border-bottom: ${({ version }) =>
    version === "secondary" ? "1px solid transparent" : "none"};
  border-radius: ${({ version }) =>
    version === "secondary" ? "none" : "0.5rem"};
  padding: ${({ version }) => (version === "secondary" ? 0 : "0.5rem")};
  filter: ${({ version }) =>
    version === "secondary"
      ? "none"
      : `drop-shadow(0px 8px 4px ${theme.ultraDarkPurple})`};

  &:hover {
    color: ${({ version, disabled }) =>
      version === "secondary" && !disabled ? theme.white : theme.gray};
    border-bottom: ${({ version, disabled }) => {
      if (version === "secondary") {
        return disabled ? "1px" : `1px solid ${theme.white}`;
      }
      return "none";
    }};
  }
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;
