import * as React from 'react';
import { connect } from 'react-redux';
import { showModal, setRecipesList, checkIndex, cancelRecipe, setEditRecipe, saveRecipeDetails } from '../utils/functions';
import Button from '../common/Button';
import { RECIPES_KEY } from '../utils/globals';
import { iRecipe, iRecipeList } from '../utils/model';
import { ApplicationState } from '../reducers';
import Spinner from '../common/Spinner';

const emptySelect = new iRecipe(0, "", "");

interface RecipesProps {
  recipeList: iRecipeList
  showModal: () => void
  setRecipesList: (recipesList: iRecipe[]) => void
  cancelRecipe: () => void
  setEditRecipe: () => void
  saveRecipeDetails: (recipe: iRecipe) => void
}

interface RecipesState {
  selected: iRecipe
}

class Recipes extends React.Component<RecipesProps, RecipesState> {
  constructor(props: RecipesProps) {
    super(props)

    this.state = {
      selected: emptySelect
    }
  }
  public componentDidMount() {
    const recipesList = localStorage.getItem(RECIPES_KEY)
    const data = recipesList ? JSON.parse(recipesList) : []

    this.props.setRecipesList(data);
  }

  public render() {
    const { recipeList } = this.props;

    if (!recipeList) {
      return <Spinner />
    }

    return (
      <div>
        <div className="recipes">
          <div className="recipes__list">
            {recipeList.all.length > 0 ?
              this.renderList()
              :
              <p>You don't have any recipes</p>
            }
          </div>
          {generateButton(
            "Add recipe",
            () => this.addNew(),
            "btn-action mediumFont"
          )}
        </div>
      </div>
    )
  }

  private renderList() {
    const { recipeList: { all } } = this.props;
    const { selected } = this.state;

    return all.map((r: iRecipe, i: number) => {
      const ingredients = r.ingredients.replace(/,\s*$/, "").split(",");

      return <div key={`${r.name}_${r.id}`}
        className={`recipes__list__single ${r.name === selected.name ? 'active' : ''} ${i !== all.length - 1 ? "separator" : ""}`}

      >
        <h3 onClick={() => this.selectRecipe(r)}>{r.name}</h3>
        {r.name === selected.name &&
          <div className="recipes__list__single-details">
            <h2>Ingredients</h2>
            <div className="recipes__list__single-details-int">
              {ingredients.map((ing: string, index: number) => {
                return <p key={`${r.name}_${ing}`} className={`${index !== ingredients.length - 1 ? "noBottom" : ""}`}>
                  {ing}
                </p>
              })}
            </div>
            <div className="btn-group">
              {generateButton(
                "Delete",
                () => this.delete(),
                "btn-delete"
              )}
              {generateButton(
                "Edit",
                () => this.edit(r),
                "space10"
              )}
            </div>
          </div>
        }
      </div>
    }
    )
  }

  private selectRecipe(item: iRecipe) {
    this.setState({
      selected: this.state.selected.name === item.name ? emptySelect : item
    })
  }

  private addNew() {
    this.setState({ selected: emptySelect })
    this.props.showModal()
  }

  private edit(recipe: iRecipe) {
    const { setEditRecipe, saveRecipeDetails, showModal } = this.props;
    setEditRecipe();
    saveRecipeDetails(recipe)
    showModal()
  }

  private delete() {
    const { recipeList, setRecipesList, cancelRecipe } = this.props;
    const allRecipes = recipeList.all;
    const indexIfExist = checkIndex(allRecipes, this.state.selected)

    if (indexIfExist > -1) {
      allRecipes.splice(indexIfExist, 1)
      setRecipesList(allRecipes);
      localStorage.setItem(RECIPES_KEY, JSON.stringify(allRecipes));
      cancelRecipe()
    }
  }
}

export function generateButton(text: string, callback: () => void, styles?: any, disabled: boolean = false) {
  return (
    <Button
      text={text}
      callback={callback}
      styles={styles ? styles : ""}
      disabled={disabled}
    />
  )
}

function mapStateToProps({ recipeList }: ApplicationState) {
  return {
    recipeList
  }
}

const actions = {
  showModal,
  setRecipesList,
  cancelRecipe,
  setEditRecipe,
  saveRecipeDetails
}

export default connect(mapStateToProps, actions)(Recipes);