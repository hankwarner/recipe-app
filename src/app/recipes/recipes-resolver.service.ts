import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService
    ){}

    // prevents errors if a recipe route with ID is accessed directly
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.recipeService.recipes.length) {
            return this.dataStorageService.fetchRecipes();
        }
    }

}
