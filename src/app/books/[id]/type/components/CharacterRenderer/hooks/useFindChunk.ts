import { useCallback } from "react";
import get from "lodash/get";

export const useFindChunk = () => {
  const findCharacterLocation = useCallback(
    ({
      stringArray,
      characterLocation,
    }: {
      stringArray: Array<string>;
      characterLocation: number;
    }) => {
      // Ensure the input is valid
      if (
        !Array.isArray(stringArray) ||
        stringArray.length === 0 ||
        typeof characterLocation !== "number"
      ) {
        throw new Error("Invalid input");
      }

      // Each string in the array is exactly 100 characters long
      const chunkLength = 101;

      // Calculate the chunk index and the position within the chunk
      const chunkIndex = Math.floor(characterLocation / chunkLength);
      const positionInChunk = characterLocation % chunkLength;

      // Validate if the chunkIndex is within bounds
      if (chunkIndex >= stringArray.length) {
        return;
      }

      // Return the result in the form of an object for clarity
      return {
        character: get(stringArray, [chunkIndex, positionInChunk]) ?? "",
      };
    },
    []
  );
  return { findCharacterLocation };
};
