import * as React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../reducers';
import { iRecipe, iRecipeList, iModal } from '../utils/model';
import { cancelModal, saveRecipeDetails, setRecipesList, checkIndex, cancelRecipe, checkNameAndId } from '../utils/functions';
import Input from './Input';
import { RECIPES_KEY } from '../utils/globals';
import { generateButton } from '../recipes/Recipes';

interface MainModalProps {
  modal: iModal,
  recipe: iRecipe
  recipeList: iRecipeList
  saveRecipeDetails: (params: any) => void
  setRecipesList: (allRecipes: iRecipe[]) => void
  cancelModal: () => void
  cancelRecipe: () => void
}

class MainModal extends React.Component<MainModalProps> {
  public render() {
    const { modal: { isShowing }, recipe: { name, ingredients, isEdit } } = this.props

    return (
      isShowing &&
      <div className="modal">
        <div className="modal__container">
          <div className="modal__container--header">
            <h2>{!isEdit ? "Add a Recipe" : "Edit a Recipe"}</h2>
          </div>
          <div className="modal__container--content">
            {this.renderInput("Recipe", "name", name, "Recipe Name", false, this.existInRecipes())}
            {this.renderInput("Ingredients", "ingredients", ingredients, "Enter ingredients separeted by comma", true, false)}
          </div>
          <div className="modal__container--footer">
            {generateButton(
              !isEdit ? "Add Recipe" : "Edit Recipe",
              () => this.doSave(),
              `btn-action space10 ${this.disabled() ? 'disabled' : ''}`,
              this.disabled()
            )}
            {generateButton(
              "Close",
              () => this.closeModal(),
            )}
          </div>
        </div>
      </div>
    )
  }

  private renderInput(label: string, name: string, value: string, placeholder: string, isArea: boolean = false, isInvalid: boolean = false) {
    return (
      <Input
        labelName={label}
        name={name}
        placeholder={placeholder}
        value={value}
        callback={(name, newValue) => this.saveToForm(name, newValue)}
        isTextArea={isArea}
        error={isInvalid}
      />
    )
  }

  private doSave() {
    const { recipe, recipeList } = this.props;
    const recipeWithID = recipe.id === 0 ? Object.assign(recipe, { name: recipe.name.trim(), id: new Date().getUTCMilliseconds() }) : recipe;
    const allRecipes = recipeList.all;
    const indexIfExist = checkIndex(allRecipes, recipeWithID)

    if (indexIfExist > -1) {
      if (recipeWithID.isEdit) {
        allRecipes[indexIfExist] = recipeWithID
        this.saveData(allRecipes)
        this.closeModal()
      }
    } else if (!recipeWithID.isEdit) {
      allRecipes.push(recipeWithID)
      this.saveData(allRecipes)
      this.closeModal()
    }
  }

  private closeModal() {
    this.props.cancelRecipe()
    this.props.cancelModal()
  }

  private emptyName() {
    const { recipe } = this.props;

    return recipe.name === "";
  }

  private existInRecipes() {
    const { recipe, recipeList: { all } } = this.props;
    const thisSameItem = checkNameAndId(all, recipe)

    if (thisSameItem === -1) {
      if (all.findIndex((r: iRecipe) => r.name === recipe.name) > -1) {
        return true
      } else {
        false
      }
    }
  }

  private disabled() {
    return this.emptyName() || this.existInRecipes()
  }

  private saveToForm(name: string, value: string) {
    const { recipe, saveRecipeDetails } = this.props;
    saveRecipeDetails({ ...recipe, [name]: value })
  }

  private saveData(allRecipes: iRecipe[]) {
    this.props.setRecipesList(allRecipes);
    localStorage.setItem(RECIPES_KEY, JSON.stringify(allRecipes));
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    modal: state.modal,
    recipe: state.recipe,
    recipeList: state.recipeList
  }
}

const actions = {
  saveRecipeDetails,
  setRecipesList,
  cancelModal,
  cancelRecipe
}

export default connect(mapStateToProps, actions)(MainModal);