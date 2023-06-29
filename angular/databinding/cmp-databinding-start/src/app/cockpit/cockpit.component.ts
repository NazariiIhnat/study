import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  @Output() bluePrintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  // newServerName = '';
  @ViewChild('serverContentInput')
  serverContentInput: any = ElementRef;
  constructor() {}

  ngOnInit(): void {}

  // onAddServer() {
  //   this.serverCreated.emit({
  //     serverName: this.newServerName,
  //     serverContent: this.newServerContent,
  //   });
  // }
  onAddServer(name: string) {
    this.serverCreated.emit({
      serverName: name,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint(name: string) {
    this.bluePrintCreated.emit({
      serverName: name,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}
