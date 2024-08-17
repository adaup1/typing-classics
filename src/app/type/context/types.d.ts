import { Dispatch } from "react";

export enum actionTypes {
  changeInput = "changeInput",
  countChar = "countChar",
  countCorrectChar = "countCorrectChar",
  countAllChar = "countAllChar",
  setTimer = "setTimer",
  setPauseTimer = "setPauseTimer",
  timerIncrement = "timerIncrement",
  timerReset = "timerReset",
  autoPauseTimerIncrement = "autoPauseTimerIncrement",
  autoPauseTimerReset = "autoPauseTimerReset",
  stopTimers = "stopTimers",
  startTimers = "startTimers",
}

export enum countType {
  correctCharacters = "correctCharacters",
  allCharacters = "allCharacters",
}

export interface reducerProps {
  type: actionTypes;
  text?: Array<string>;
  input?: string;
  countType: countType;
  characterCount?: number;
  timerSeconds?: number;
  timerInterval?: number;
  autoPauseSecond?: number;
  autoPauseTimerInterval?: number;
  timersRunning?: boolean;
}

export interface TypingState {
  text: Array<string>;
  input: string;
  correctCharacters: number;
  allCharacters: number;
  timerSeconds: number;
  timerInterval?: number;
  autoPauseSeconds: number;
  autoPauseTimerInterval?: number;
  timersRunning: boolean;
}

export const DEFAULT_STATE: TypingState = {
  text: [""],
  input: "",
  correctCharacters: 0,
  allCharacters: 0,
  timerSeconds: 0,
  timerInterval: 0,
  autoPauseSeconds: 0,
  autoPauseTimerInterval: 0,
  timersRunning: false,
};

export interface TypingContextProps {
  state: TypingState;
  dispatch: Dispatch<reducerProps>;
}
