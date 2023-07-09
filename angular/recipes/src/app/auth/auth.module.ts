import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AlertDirective } from 'src/shared/alert/alert.directive';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
    CommonModule,
    FormsModule,
  ],
})
export class AuthModule {}
