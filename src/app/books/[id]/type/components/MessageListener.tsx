import React, { useEffect } from "react";
import { useTypingDispatchContext } from "../context/TypingContext";
import { actionTypes } from "../context/types.d";

const MessageListener = () => {
  const { dispatch } = useTypingDispatchContext();

  useEffect(() => {
    const handleMessage = (event: { origin: string; data: any }) => {
      if (event.origin !== window.location.origin) {
        // Ensure the message is from the same origin
        console.warn("Message from untrusted origin:", event.origin);
        return;
      }

      if (event.data.correctCharacters) {
        const { correctCharacters } = event.data;
        dispatch({
          type: actionTypes.countCorrectChar,
          correctCharacters,
        });
      }

      if (event.data.inputArray && event.data.inputIndex) {
        const { inputArray, inputIndex } = event.data;
        dispatch({
          type: actionTypes.updateInput,
          inputArray,
          inputIndex,
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [dispatch]);

  return null;
};

export default MessageListener;
