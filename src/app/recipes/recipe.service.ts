import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: "root" })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [];

  get recipes() {
    return this._recipes;
  }

  set recipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesChanged.next(this._recipes);
  }

  getRecipeByIndex(index: number) {
    return this._recipes.find((r, i) => i == index);
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
  }
  
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this._recipes[index] = updatedRecipe;
  }
  
  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
  }
}
