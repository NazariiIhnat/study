import { Component, Input, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';
import UserService from '../user.service';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
})
export class InactiveUserComponent implements OnInit {
  users: string[] = [];
  constructor(
    private userService: UserService,
    private counterService: CounterService
  ) {}
  ngOnInit(): void {
    this.users = this.userService.getInactiveUsers();
  }

  onChangeToActive(user: string) {
    this.userService.setToActive(user);
    this.counterService.addToActive();
  }
}
