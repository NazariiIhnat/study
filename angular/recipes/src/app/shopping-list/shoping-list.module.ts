import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'shoping-list', component: ShoppingListComponent },
    ]),
  ],
})
export class ShoppingListModule {}
