import { AsyncPipe, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addQuantity,
  addUser,
  clearPasswords,
  deleteUser,
  generatePassword,
  reduceQuantity,
} from './store/component.actions';
import {
  passwordsSelector,
  quantitySelector,
  userSelector,
} from './store/component.selector';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [AsyncPipe, NgFor],
})
export class AppComponent {
  quantity$: Observable<number>;
  passwords$: Observable<string[]>;
  users$: Observable<User[]>;

  constructor(
    private quantityStore: Store<{ quantityStore: number }>,
    private passwordStore: Store<{ passwordStore: string[] }>,
    private userStore: Store<{ userStore: User[] }>
  ) {
    this.quantity$ = quantityStore.select(quantitySelector);
    this.passwords$ = passwordStore.select(passwordsSelector);
    this.users$ = userStore.select(userSelector);
  }

  increment() {
    this.quantityStore.dispatch(addQuantity());
  }

  decrement() {
    this.quantityStore.dispatch(reduceQuantity({ reduceValue: 5 }));
  }

  onGeneratePassword() {
    this.passwordStore.dispatch(generatePassword({ length: 10 }));
  }

  onClearPasswords() {
    this.passwordStore.dispatch(clearPasswords());
  }

  onAddUser() {
    this.passwordStore.dispatch(addUser({ name: 'nazarii', age: 41, id: 12 }));
  }

  onDeleteUser() {
    this.userStore.dispatch(deleteUser({id: 5}))
  }
}
