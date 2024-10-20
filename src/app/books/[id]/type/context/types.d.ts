import { Dispatch } from "react";

export enum actionTypes {
  changeInput = "changeInput",
  updateInput = "updateInput",
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
  easySpecialCharacters = "easySpecialCharacters",
}

export enum countType {
  correctCharacters = "correctCharacters",
  allCharacters = "allCharacters",
}

export interface reducerProps {
  type: actionTypes;
  text?: Array<string>;
  input?: string;
  inputArray?: Array<string>;
  inputIndex?: number;
  countType?: countType;
  characterCount?: number;
  correctCharacters?: number;
  time?: number;
  timerSeconds?: number;
  timerInterval?: number;
  autoPauseSecond?: number;
  autoPauseTimerInterval?: number;
  timersRunning?: boolean;
  easySpecialCharacters?: boolean;
}

export interface TypingState {
  text: Array<string>;
  inputArray: Array<string>;
  inputIndex: number;
  correctCharacters: number;
  allCharacters: number;
  time: number;
  timerSeconds: number;
  timerInterval?: number;
  autoPauseSeconds: number;
  autoPauseTimerInterval?: number;
  timersRunning: boolean;
  easySpecialCharacters: boolean;
}

export const DEFAULT_STATE: TypingState = {
  text: [""],
  inputArray: [""],
  inputIndex: -1,
  correctCharacters: 0,
  allCharacters: 0,
  time: 0,
  timerSeconds: 0,
  timerInterval: 0,
  autoPauseSeconds: 0,
  autoPauseTimerInterval: 0,
  timersRunning: false,
  easySpecialCharacters: false,
};

export interface TypingContextProps {
  state: TypingState;
}

export interface TypingDispatchContextProps {
  dispatch: Dispatch<reducerProps>;
}
