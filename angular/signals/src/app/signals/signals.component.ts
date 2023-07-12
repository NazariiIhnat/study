import { NgFor } from "@angular/common";
import { Component, signal, computed, OnInit, effect } from "@angular/core";

@Component({
  selector: "app-signals",
  templateUrl: "./signals.component.html",
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log(this.counter()));
  }

  increment() {
    this.counter.update((oldValue) => ++oldValue);
    this.actions.mutate((oldValue) => oldValue.push("INCREMENT"));
  }

  decrement() {
    this.counter.update((oldValue) => --oldValue);
    this.actions.mutate((oldValue) => oldValue.push("DECREMENT"));
  }
}
