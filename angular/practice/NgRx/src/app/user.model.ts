let counter = 0;

export class User {
  id: number;
  constructor(public name: string, public age: number) {
    this.id = ++counter;
  }
}
