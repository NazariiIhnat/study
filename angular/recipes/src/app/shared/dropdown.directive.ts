import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor() {}

  @HostBinding('class') class: String = '';
  @HostListener('click') onClick(eventData: Event) {
    this.class === '' ? (this.class = 'open') : (this.class = '');
  }
}
