import { Component } from "@angular/core";
import { DetailsComponent } from "./details/details.component";
import { AnalyticsService } from "../shared/analytics.service";
import { TestRoutComponent } from "../test/test-rout.component";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [DetailsComponent, TestRoutComponent, RouterModule],
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
})
export class WelcomeComponent {
  constructor(private test: AnalyticsService) {}

  onClick() {
    this.test.registerClick('From welcome');
  }
}
