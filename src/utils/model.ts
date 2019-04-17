export interface iModal {
  isShowing: boolean
}

export interface iRecipe {
  id: number
  name: string
  ingredients: string
  isEdit?: boolean
}

export class iRecipe {
  constructor(
    public index: number,
    public name: string,
    public ingredients: string,
    public isEdit?: boolean
  ) { }
}

export interface iRecipeList {
  all: iRecipe[]
}