import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export default class UserService {
  activeUsers = ['Nazarii', 'Khrystyna'];
  inactiveUsers = ['Ihor', 'Svitlana'];

  setToActive(user: string) {
    const index = this.inactiveUsers.indexOf(user);
    this.inactiveUsers.splice(index, 1);
    this.activeUsers.push(user);
  }

  setToInactive(user: string) {
    const index = this.activeUsers.indexOf(user);
    this.activeUsers.splice(index, 1);
    this.inactiveUsers.push(user);
  }

  getActiveUsers() {
    return this.activeUsers;
  }

  getInactiveUsers() {
    return this.inactiveUsers;
  }
}
