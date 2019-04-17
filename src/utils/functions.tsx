import { CANCEL_MODAL, SHOW_MODAL, CLEAR_RECIPE, SET_ALL_RECIPES, EDIT_RECIPE, SELECT_RECIPE } from "./globals";
import { iRecipe } from "./model";


export const showModal = () => {
  return {
    type: SHOW_MODAL
  }
};


export const cancelModal = () => {
  return {
    type: CANCEL_MODAL
  }
}

export const saveRecipeDetails = (recipe: iRecipe) => {
  return {
    type: SELECT_RECIPE,
    recipe
  }
}

export const setEditRecipe = () => {
  return {
    type: EDIT_RECIPE,
    isEdit: true
  }
}

export const cancelRecipe = () => {
  return {
    type: CLEAR_RECIPE
  }
}

export const setRecipesList = (recipes: iRecipe[]) => {
  return {
    type: SET_ALL_RECIPES,
    recipes
  }
}

export function checkIndex(array: iRecipe[], item: iRecipe) {
  return array.findIndex((r: iRecipe) => r.id === item.id)
}

export function checkNameAndId(array: iRecipe[], item: iRecipe) {
  return array.findIndex((r: iRecipe) => r.id === item.id && r.name === item.name.trim())
}