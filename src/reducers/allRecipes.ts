import { SET_ALL_RECIPES } from "../utils/globals";

const initialState = null

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case SET_ALL_RECIPES:
      return {
        all: action.recipes
      };
    default:
      return state
  }
};