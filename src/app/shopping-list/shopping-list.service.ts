import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({ providedIn: "root" })
export class ShoppingListService  {
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  private _ingredients: Ingredient[] = [
    new Ingredient("Tofu", 2),
    new Ingredient("Sesame Oil", 1)
  ];

  get ingredients() {
    return this._ingredients;
  }

  getIngredient(index: number) {
    return this._ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this._ingredients[index] = newIngredient;
  }

  deleteIngredient(index: number) {
    this._ingredients.splice(index, 1);
  }
}
