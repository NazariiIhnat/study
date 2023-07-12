import { Injectable } from "@angular/core";

@Injectable()
export class AnalyticsService {
  private lastClick: string = "";

  registerClick(msg: string) {
    console.log(this.lastClick);
    this.lastClick = msg;
  }
}
