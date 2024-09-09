"use client";

import { useCallback } from "react";
import { styled } from "css-template-components/client";
import { actionTypes, countType } from "./context/types.d";
import { CharacterRenderer } from "./NewCharacterRenderer";
import {
  withTypingContextProvider,
  useTypingContext,
} from "./context/TypingContext";

const TypingView = ({ text }: { text: string }) => {
  const { state, dispatch, countChar } = useTypingContext();

  const onCountAllChar = useCallback(() => {
    countChar({
      countType: countType.allCharacters,
      characterCount: state.correctCharacters + 1,
    });
  }, [countChar, state.correctCharacters]);

  const onCountCorrectChar = useCallback(() => {
    countChar({
      countType: countType.correctCharacters,
      characterCount: state.correctCharacters + 1,
    });
  }, [countChar, state.correctCharacters]);

  return (
    <>
      <StyledContainer>
        <StyledSideContainer></StyledSideContainer>
        <StyledCenterContainer>
          <CharacterRenderer text={text} />
        </StyledCenterContainer>
        <StyledSideContainer></StyledSideContainer>
      </StyledContainer>
      <div>
        <button onClick={onCountAllChar}>All Characters</button>
        {state.allCharacters}
      </div>
      <div>
        <button onClick={onCountCorrectChar}>Correct Characters</button>
        {state.correctCharacters}
      </div>
    </>
  );
};

export default withTypingContextProvider(TypingView);

const StyledContainer = styled(
  "div",
  `
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
);

const StyledCenterContainer = styled(
  "div",
  `
  width: 50vw;
  height: 100%;
`
);

const StyledSideContainer = styled(
  "div",
  `
  width: 25vw;
`
);
