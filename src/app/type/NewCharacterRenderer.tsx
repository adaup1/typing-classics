import React from "react";
import VirtualizedText from "@/app/components/lists/VirtualizedText";

export const CharacterRenderer = ({ text }) => {
  return (
    <div>
      <VirtualizedText text={text} />
    </div>
  );
};
