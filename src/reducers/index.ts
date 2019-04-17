import { Reducer, combineReducers } from "redux";
import modalReducer from './modal';
import recipeReducer from './recipe';
import recipeListReducer from "./allRecipes";

import { iModal, iRecipe, iRecipeList } from "../utils/model";

export interface ApplicationState {
  modal: iModal
  recipe: iRecipe
  recipeList: iRecipeList
}

export const rootReducers: Reducer<ApplicationState> = combineReducers({
  modal: modalReducer,
  recipe: recipeReducer,
  recipeList: recipeListReducer
})