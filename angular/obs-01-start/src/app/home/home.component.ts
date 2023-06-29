import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, observable } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private mySubscription: Subscription;

  constructor() {}
  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }

  ngOnInit() {
    const customObserver = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) observer.complete();
        if (count > 3)
          observer.error(new Error('Something went wrong in observer'));
        count++;
      }, 1000);
    });

    this.mySubscription = customObserver
      .pipe(
        filter((data: number) => data > 1),
        map((data: number) => `Round: ${data + 1}`)
      )
      .subscribe(
        (data) => console.log(data),
        (error) => alert(error.message),
        () => alert('Success')
      );
  }
}
