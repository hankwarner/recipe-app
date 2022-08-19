import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  private _ingredients: Ingredient[] = [
    new Ingredient("Tofu", 2),
    new Ingredient("Sesame Oil", 1)
  ];

  get ingredients() {
    return this._ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
  }
}
