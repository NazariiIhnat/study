import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-server-component',
  templateUrl: './server-component.component.html',
  styleUrls: ['./server-component.component.css'],
})
export class ServerComponentComponent implements OnInit {
  @Input('srvElement') element: { type: string; name: string; content: string };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('element changed');
  }

  change() {
    console.log(this.element);
    this.element.type = 'Changed';
    console.log(this.element);
  }
}
