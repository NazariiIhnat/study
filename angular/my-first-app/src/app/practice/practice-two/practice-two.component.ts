import { Component } from '@angular/core';

@Component({
  selector: 'app-practice-two',
  templateUrl: 'practice-two.component.html',
  styleUrls: ['practice-two.component.css'],
})
export class PracticeTwo {
  secretLineVisiable = false;
  curData: number;
  dataArr = [];

  onClick() {
    if (!this.secretLineVisiable) {
      this.curData = Math.random() * 10;
      this.dataArr.push(this.curData);
      this.secretLineVisiable = true;
    } else this.secretLineVisiable = false;
  }
}
