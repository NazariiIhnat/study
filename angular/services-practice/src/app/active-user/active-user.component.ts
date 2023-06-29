import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { CounterService } from '../counter.service';
import UserService from '../user.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
})
export class ActiveUserComponent implements OnInit {
  users: string[] = [];
  constructor(
    private userService: UserService,
    private counterService: CounterService
  ) {}
  ngOnInit(): void {
    this.users = this.userService.getActiveUsers();
  }

  onChangeToInactive(user: string) {
    this.userService.setToInactive(user);
    this.counterService.addToInactive();
  }
}
