import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() itemAddEvent = new EventEmitter<Ingredient>();

  name: string;
  amount: number;

  constructor() { }

  ngOnInit(): void {
  }

  onItemAdd() {
    this.itemAddEvent.emit(new Ingredient(this.name, this.amount));
  }

}
