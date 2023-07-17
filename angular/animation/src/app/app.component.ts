import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          backgroundColor: 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translatex(100px)',
        })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
    ]),
  ],
})
export class AppComponent {
  state = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item: any) {
    this.list.push(item);
  }

  onDelete(item: any) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    this.state === 'normal'
      ? (this.state = 'highlighted')
      : (this.state = 'normal');
  }
}
