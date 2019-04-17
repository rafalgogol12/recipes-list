import { SHOW_MODAL, CANCEL_MODAL } from "../utils/globals";

const initialState = {
  isShowing: false,
  actionToDispatch: undefined,
  actionParams: undefined,
}

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isShowing: true,
        actionToDispatch: action.actionToDispatch,
        actionParams: action.actionParams,
      };
    case CANCEL_MODAL:
      return {
        ...state,
        isShowing: false,
        actionToDispatch: undefined,
        actionParams: undefined,
      };
    default:
      return state
  }
};