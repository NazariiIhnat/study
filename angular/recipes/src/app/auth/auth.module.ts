import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
