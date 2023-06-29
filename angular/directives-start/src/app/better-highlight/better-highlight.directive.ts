import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string;
  @HostBinding('style.backgroundColor') backgroundColor: string =
    this.defaultColor;
  @HostBinding('style.fontSize') font: string = '16px';
  constructor() {
    console.log('directive');
  }
  ngOnInit(): void {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-image',
    //   'linear-gradient(#246135, #816374)'
    // );
  }

  @HostListener('mouseenter') mouseEnter(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-image',
    //   'linear-gradient(#246135, #816374)'
    // );
    this.backgroundColor = this.highlightColor;
    this.font = '90px';
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-image',
    //   'linear-gradient(#864975, #294736)'
    // );
    this.backgroundColor = this.defaultColor;
    this.font = '15px';
  }
}
