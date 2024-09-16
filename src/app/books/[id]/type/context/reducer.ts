import { reducerProps, actionTypes } from "./types.d";

export const reducer = (state: any, action: reducerProps) => {
  switch (action.type) {
    // case actionTypes.changeInput:
    //   return { ...state, input: action.input };
    case actionTypes.updateInput:
      return {
        ...state,
        inputArray: action.inputArray,
        inputIndex: action.inputIndex,
      };
    case actionTypes.countChar:
      return { ...state, countType: action.characterCount };
    case actionTypes.setTimer:
      return state;
    case actionTypes.setPauseTimer:
      return state;
    case actionTypes.timerIncrement:
      return state;
    case actionTypes.timerReset:
      return state;
    case actionTypes.autoPauseTimerIncrement:
      return state;
    case actionTypes.autoPauseTimerReset:
      return state;
    case actionTypes.stopTimers:
      return state;
    case actionTypes.startTimers:
      return state;
    default:
      throw new Error();
  }
};
