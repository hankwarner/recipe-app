import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // TODO: default to first recipe item
  selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  updateSelectedRecipe(ev) {
    this.selectedRecipe = ev;
  }

}
