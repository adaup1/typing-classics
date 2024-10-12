import { useCallback } from "react";
import { styled } from "css-template-components/client";
import { Toggle } from "@/app/components/client/inputs/Toggle";
import { Tooltip } from "@/app/components/client/tooltips/Tooltip";
import { EasySpecialCharactersTip } from "./EasySpecialCharactersTip";
import { theme } from "@/app/theme";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EasySpecialCharacters = ({
  onChange,
  value,
}: {
  onChange: (boolean) => void;
  value: boolean;
}) => {
  const handleOnChange = useCallback(
    (e) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  return (
    <StyledContainer>
      <div>
        {"Easy Special Characters "}
        <Tooltip tip={EasySpecialCharactersTip}>
          <StyledIcon icon={faCircleQuestion} />
        </Tooltip>
      </div>
      <div>
        <Toggle checked={value} onChange={handleOnChange} />
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  `
  width: 16rem;
  filter: drop-shadow(0 0 0.5rem ${theme["gray"]});
  border-radius: 0.5rem;
  background: ${theme["darkerPurple"]};
  display: flex;
  height: fit-content;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
  align-items: center;
  cursor: default;

`
);

const StyledIcon = styled(
  FontAwesomeIcon,
  `
  font-size: 1rem;
  width: fit-content;
  cursor: pointer;
`
);
