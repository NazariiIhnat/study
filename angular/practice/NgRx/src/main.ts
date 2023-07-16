import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import {
  passwordReducer,
  quantityReducer,
  userReducer,
} from './app/store/component.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({
      quantityStore: quantityReducer,
      passwordStore: passwordReducer,
      userStore: userReducer
    }),
  ],
});
