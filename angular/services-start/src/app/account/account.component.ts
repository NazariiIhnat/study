import { Component, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(
    private loggingService: LoggingService,
    private accountService: AccountService
  ) {}

  onSetTo(status: string) {
    this.accountService.onStatusChanged(this.id, status);
    this.accountService.statusUpdated.emit(status);
    // this.loggingService.logStatusChange(status);
    this.accountService.statusUpdated.subscribe((status: string) =>
      alert('New status : ' + status)
    );
  }
}
