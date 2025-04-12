import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true,
})
export class UppercaseDirective implements AfterViewInit {
  #el = inject(ElementRef);
  #renderer = inject(Renderer2);

  ngAfterViewInit() {
    this.#renderer.setStyle(
      this.#el.nativeElement,
      'text-transform',
      'uppercase',
    );
  }
}
