import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild("f") form: NgForm;

  get btnText() {
    return !this.editMode ? "Add" : "Update";
  }

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue(
          {
            "name": this.editedItem.name,
            "amt": this.editedItem.amount
          },
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFormSubmit() {
    const value = this.form.value;
    const newIngredient = new Ingredient(value.name, value.amt);

    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;

    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.form.resetForm();
  }

  onClearForm() {
    this.form.reset();
    this.editMode = false;
    this.editedItemIndex = null;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }
}
