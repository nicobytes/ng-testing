import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-resize-observer',
  standalone: true,
  imports: [],
  template: `<div>Hello</div>`,
  styles: `
    :host {
      border: 1px solid red;
      width: 100%;
      display: block;
    }
  `,
})
export class ResizeObserverComponent {
  readonly #host = inject(ElementRef);
  readonly #resizeObserver = new ResizeObserver((entries) => {
    this.#resize$.next(entries[0]);
  });
  readonly #resize$ = new Subject<ResizeObserverEntry>();

  constructor() {
    this.#resizeObserver.observe(this.#host.nativeElement);
    this.#resize$.pipe(debounceTime(500)).subscribe(() => {
      console.log('change');
    });
  }
}
