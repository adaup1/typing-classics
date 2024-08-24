import React from "react";
import VirtualizedText from "@/app/components/lists/VirtualizedText";

export const CharacterRenderer = ({ text }: { text: string }) => {
  return (
    <div>
      <VirtualizedText text={text} />{" "}
    </div>
  );
};
