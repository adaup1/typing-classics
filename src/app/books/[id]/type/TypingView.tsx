"use client";

import { useCallback, useMemo } from "react";
import { styled } from "css-template-components/client";
import { actionTypes, countType } from "./context/types.d";
import { CharacterRenderer } from "./components/CharacterRenderer";
import { Book } from "@/app/lib/types";
import { CoverImage } from "@/app/components/images/CoverImage";
import { Stats } from "./components/Stats";
import { MobileStats } from "./components/MobileStats";
import {
  useTypingContext,
  TypingContextProvider,
} from "./context/TypingContext";
import { useMediaQuery } from "react-responsive";

const TypingView = ({ bookData }: { bookData: Book }) => {
  const { state, dispatch, countChar } = useTypingContext();
  const { text = "", cover_image_url = "", title_short } = bookData;
  const displayCover = useMediaQuery({ minWidth: 1160 });
  const isMobile = useMediaQuery({ maxWidth: 680 });

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
    <TypingContextProvider text={text}>
      <StyledContainer isMobile={isMobile}>
        {displayCover && (
          <StyledLeftContainer>
            <CoverImage
              src={cover_image_url}
              alt={`Cover image of ${title_short}`}
            />
          </StyledLeftContainer>
        )}
        {!!isMobile && <MobileStats />}
        <StyledCenterContainer isMobile={isMobile}>
          <CharacterRenderer text={text} />
        </StyledCenterContainer>
        {!isMobile && (
          <StyledRightContainer>
            <Stats />
          </StyledRightContainer>
        )}
      </StyledContainer>
    </TypingContextProvider>
  );
};

export default TypingView;

const StyledContainer = styled(
  "div",
  ({ isMobile }: { isMobile: boolean }) =>
    `
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
    justify-content: center;
    flex-direction: ${isMobile ? "column" : "row"};
    align-items: ${isMobile ? "center" : "start"};
    overflow: none;
`
);

const StyledCenterContainer = styled(
  "div",
  ({ isMobile }: { isMobile: boolean }) =>
    `
    max-width: ${isMobile ? "calc(100vw - 4rem)" : "50vw"};
    width: 64rem;
    height: 100%;
    margin-left: 2rem;
    margin-right: 2rem;
`
);

const StyledLeftContainer = styled(
  "div",
  `
  max-width: 25vw;
  margin-left: 2rem;
  `
);

const StyledRightContainer = styled(
  "div",
  `
  margin-right: 2rem;
  `
);
