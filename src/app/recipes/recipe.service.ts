import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private _recipes: Recipe[] = [
    new Recipe(
      "Lemon Pepper Wings",
      "",
      "https://assets3.thrillist.com/v1/image/1896121/1200x630",
      [
        new Ingredient("Meat", 1),
        new Ingredient("Lemons", 2),
        new Ingredient("Pepper", 1),
        new Ingredient("Butter", 1)
      ]
    ),
    new Recipe(
      "Mac n' Cheese",
      "",
      "https://media-cdn.tripadvisor.com/media/photo-s/06/3e/71/d8/killer-mac-cheese.jpg",
      [
        new Ingredient("Noodles", 1),
        new Ingredient("Cheese", 1),
        new Ingredient("Butter", 1)
      ]
    ),
  ];

  get recipes() {
    return this._recipes;
  }
}
