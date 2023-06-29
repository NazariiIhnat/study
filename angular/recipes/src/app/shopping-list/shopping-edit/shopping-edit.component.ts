import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/shared/ingredient.model';
import { ShoppingListService } from '../shoping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  subscribtion: Subscription;
  editeMode = false;
  editingItemIndex: number;
  editingIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  addItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.editeMode
      ? this.shoppingListService.updateIngredient(
          this.editingItemIndex,
          newIngredient
        )
      : this.shoppingListService.addIngredient(newIngredient);

    this.editeMode = false;
    form.reset();
  }

  ngOnInit(): void {
    this.subscribtion = this.shoppingListService.startEditing.subscribe(
      (index) => {
        this.editingItemIndex = index;
        this.editeMode = true;
        this.editingIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editingIngredient.name,
          amount: this.editingIngredient.amount,
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editeMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }
}
