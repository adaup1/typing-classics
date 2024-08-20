"client";

import { SetStateAction, useState } from "react";
import styled from "styled-components";

interface VirtualizedListProps {
  totalItems: number;
  itemHeight: number;
  renderItem: any;
  windowHeight: number;
  overscan: number;
}

export const VirtualizedList = ({
  totalItems,
  itemHeight,
  renderItem,
  windowHeight,
  overscan,
}: VirtualizedListProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  const innerHeight = totalItems * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    totalItems - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight) + overscan
  );

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItem({
        index: i,
        style: {
          position: "absolute",
          top: `${i * itemHeight}px`,
          width: "100%",
        },
      })
    );
  }

  const onScroll = (e: {
    currentTarget: { scrollTop: SetStateAction<number> };
  }) => setScrollTop(e.currentTarget.scrollTop);

  return (
    <StyledContainer onScroll={onScroll}>
      <StyledInnerContainer>{items}</StyledInnerContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  overflow-y: auto;
`;

const StyledInnerContainer = styled.div`
  position: relative;
  height: 100vh;
`;
