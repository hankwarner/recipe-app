import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ){ }

    storeRecipes() {
        this.http
            .put(
                "https://recipe-app-34669-default-rtdb.firebaseio.com/recipes.json",
                this.recipeService.recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>('https://recipe-app-34669-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(r => {
                        return {
                            ...r,
                            ingredients: r.ingredients ?? []
                        }
                    });
                }),
                tap(recipes => {
                    this.recipeService.recipes = recipes;
                })
            );
    }
}
