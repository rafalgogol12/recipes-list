import { SELECT_RECIPE, CLEAR_RECIPE, EDIT_RECIPE } from "../utils/globals";

const initialState = {
  id: 0,
  name: "",
  ingredients: "",
  isEdit: false
}

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case SELECT_RECIPE:
      return {
        ...state,
        id: action.recipe.id,
        name: action.recipe.name,
        ingredients: action.recipe.ingredients
      };
    case EDIT_RECIPE:
      return {
        ...state,
        isEdit: action.isEdit
      }
    case CLEAR_RECIPE:
      return initialState
    default:
      return state
  }
};