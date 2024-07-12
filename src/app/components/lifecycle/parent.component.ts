import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="toggle()">change</button>
    <div #container class="container">
      @if ($isLoading()) {
        <p>Loading</p>
      } @else {
        <app-child />
      }
    </div>
  `,
  styles: `
    .container {
      padding: 5px;
      display: block;
      border: 1px solid red;
    }
  `,
})
export default class ParentComponent implements AfterViewChecked {
  $isLoading = signal(true);
  @ViewChild('container') child!: ElementRef<HTMLDivElement>;

  toggle() {
    this.$isLoading.update((state) => !state);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
    console.log(this.child.nativeElement.clientHeight);
  }
}
