import { User } from '../user.model';

export const quantitySelector = (store: { quantityStore: number }) =>
  store.quantityStore;

export const passwordsSelector = (store: { passwordStore: string[] }) =>
  store.passwordStore;

export const userSelector = (store: { userStore: User[] }) => store.userStore;
