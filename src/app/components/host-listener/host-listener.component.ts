import { Component, HostListener } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-host-listener',
  standalone: true,
  imports: [],
  template: `<h1>Host</h1>`,
})
export class HostListenerComponent {
  readonly #resizeSubject = new Subject();

  @HostListener('window:resize', ['$event'])
  resize(event: Event) {
    this.#resizeSubject.next(event);
  }

  constructor() {
    this.#resizeSubject
      .pipe(debounceTime(500))
      .subscribe(() => console.log('calc'));
  }
}
