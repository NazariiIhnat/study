import { createAction, props } from '@ngrx/store';

export const addQuantity = createAction('[Quantity] Add');

export const reduceQuantity = createAction(
  '[Quantity] Remove',
  props<{ reduceValue: number }>()
);

export const generatePassword = createAction(
  '[Password] Generate',
  props<{ length: number }>()
);

export const clearPasswords = createAction('[Passwords] Clear');

export const addUser = createAction(
  '[User] Add',
  props<{ name: string; age: number; id: number }>()
);

export const deleteUser = createAction(
  '[User] Delete',
  props<{ id: number }>()
);
