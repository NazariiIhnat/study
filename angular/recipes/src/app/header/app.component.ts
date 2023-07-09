import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from 'src/shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<String>();

  private sunscribtion = new Subscription();
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authSrvice: AuthService
  ) {}

  ngOnInit(): void {
    this.sunscribtion = this.authSrvice.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.sunscribtion.unsubscribe();
  }

  onSelected(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authSrvice.logout();
  }
}
