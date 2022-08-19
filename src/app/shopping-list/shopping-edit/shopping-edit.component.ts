import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit {
  name: string;
  amount: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onItemAdd() {
    this.shoppingListService.addIngredient(
      new Ingredient(this.name, this.amount)
    );
  }

}
