import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/app.component';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    CoreModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
