export class CounterService {
  private toActive = 0;
  private toInactive = 0;

  addToActive(): void {
    this.toActive++;
    this.logInfo();
  }

  addToInactive(): void {
    this.toInactive++;
    this.logInfo();
  }

  private logInfo(): void {
    console.log(`Active: ${this.toActive}   Inactive: ${this.toInactive}`);
  }
}
