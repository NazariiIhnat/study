import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertDirective } from 'src/app/shared/alert/alert.directive';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(AlertDirective, { static: true })
  alertDirective!: AlertDirective;
  private alertSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) authObs = this.authService.signin(email, password);
    else authObs = this.authService.signup(email, password);

    authObs.subscribe({
      next: (data) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
        this.onHandleError();
      },
    });
    form.reset();
  }

  onHandleError() {
    const vcr = this.alertDirective.viewContainerRef;
    vcr.clear();
    const componentRef = vcr.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = 'Wrong nickname or password';
    this.alertSub = componentRef.instance.close.subscribe(() => {
      this.alertSub.unsubscribe();
      vcr.clear();
    });
  }
  ngOnDestroy(): void {
    if (this.alertSub) this.alertSub.unsubscribe();
  }
}
