import { createReducer, on } from '@ngrx/store';
import {
  addQuantity,
  addUser,
  clearPasswords,
  deleteUser,
  generatePassword,
  reduceQuantity,
} from './component.actions';
import { User } from '../user.model';

const quantityInitialState = 10;
const passwordsInitialState = ['qwerty'];
const userInitialState = [new User('Nazarii', 29)];

export const quantityReducer = createReducer(
  quantityInitialState,
  on(addQuantity, (state, action) => state + 1),
  on(reduceQuantity, (state, action) => state - action.reduceValue)
);

export const passwordReducer = createReducer(
  passwordsInitialState,
  on(generatePassword, (state = passwordsInitialState, action) => {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = lowerCaseLetters.toUpperCase;
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_-=+[]{};:|<>?/';
    const characters = lowerCaseLetters + upperCaseLetters + numbers + symbols;
    const passwordLength = action.length;
    let password = '';
    for (let i = 0; i <= passwordLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return [...state, password];
  }),
  on(clearPasswords, (state, action) => [])
);

export const userReducer = createReducer(
  userInitialState,
  on(addUser, (state = userInitialState, action) => {
    const user = new User(action.name, action.age);
    return [...state, user];
  }),
  on(deleteUser, (state, action) =>
    [...state].filter((user) => user.id !== action.id)
  )
);
