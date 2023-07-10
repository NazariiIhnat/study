import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shoping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingServiceSub: Subscription;

  constructor(private shopingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shopingListService.getIngredients();
    this.ingServiceSub = this.shopingListService.ingredientsChanges.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shopingListService.startEditing.next(index);
  }

  ngOnDestroy() {
    this.ingServiceSub.unsubscribe();
  }
}
