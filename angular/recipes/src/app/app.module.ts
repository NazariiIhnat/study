import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/app.component';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';
import { ShoppingListModule } from './shopping-list/shoping-list.module';
import { CoreModule } from './core.module';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    RecipesModule,
    ShoppingListModule,
    RecipesRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
