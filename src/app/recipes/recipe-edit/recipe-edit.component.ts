import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe = new Recipe();
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  get ingredientsFormArr() {
    return <FormArray>this.recipeForm.get("ingredients");
  }

  get controls() {
    return this.ingredientsFormArr?.controls;
  }

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.editMode = !!params.id;
      this.initForm();
    });
  }

  private initForm() {
    if(this.id) {
      this.recipe = this.recipeService.getRecipeByIndex(this.id);
    }
    const ingredients = new FormArray([]);

    this.recipe.ingredients.forEach(ingredient => {
      ingredients.push(
        new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      );
    });

    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name, Validators.required),
      imagePath: new FormControl(this.recipe.imagePath, Validators.required),
      description: new FormControl(this.recipe.description, Validators.required),
      ingredients
    });
  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.navigateBack();
  }

  onAddIngredient() {
    this.ingredientsFormArr.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    this.ingredientsFormArr.removeAt(index)
  }

  navigateBack() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
