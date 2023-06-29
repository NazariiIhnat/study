import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsernames = ['Carl', 'Anna'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(
          null,
          Validators.required,
          this.forbiddenNames.bind(this)
        ),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    this.signupForm.statusChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl([null]);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  async forbiddenNames(
    control: FormControl
  ): Promise<{ isForbittenName: boolean }> {
    return new Promise((resolve) => {
      this.forbiddenUsernames.indexOf(control.value) !== -1
        ? resolve({ isForbittenName: true })
        : null;
    });
  }

  forbiddenEmails(
    control: FormControl
  ):
    | Promise<{ isForbiddenEmail: boolean }>
    | Observable<{ isForbiddenEmail: boolean }> {
    return new Promise<{ isForbiddenEmail: boolean }>((resolve, reject) => {
      setTimeout(() => {
        control.value === 'test@gmail.com'
          ? resolve({ isForbiddenEmail: true })
          : resolve(null);
      });
    });
  }
}
