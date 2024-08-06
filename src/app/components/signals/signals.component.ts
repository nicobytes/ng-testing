import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '@services/data.service';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [FormsModule, ChildComponent],
  providers: [DataService],
  template: `
    <main class="container">
    <p>signals works!</p>
    <p>{{ $isInstalled() }}</p>
    <p>{{ $isLoading() }}</p>
    <p>
      <input type="text" [(ngModel)]="$text">
    </p>
    <button type="button" data-testid="btn-emit" (click)="emit()">emit</button>
    <input type="checkbox" data-testid="checkbox" [checked]="$isInstalled()" />
    <button type="button" (click)="toggleChild()">show</button>
    <button type="button" (click)="increment()">increment</button>
    <p>{{ $number() }}</p>
    @if ($showChild()) {
        <app-child [number]="$number()" [(value)]="$text" [categories]="[]"/>  
    }
</main>

  `
})
export class SignalsComponent implements OnInit {
  control = new FormControl();
  #dataService = inject(DataService);
  $isInstalled = toSignal(this.#dataService.isInstalled(), {
    initialValue: false,
  });

  $manual = signal(true);
  $text = signal('texto');

  $status = input.required({ alias: 'status' });
  $isLoading = computed(() => this.$status() === 'loading');

  onEvent = output<string>();

  $lastname = input('', { alias: 'lastname' });
  $showChild = signal(false);
  $number = signal(0);

  constructor() {
    effect(() => {
      const text = this.$text();
      console.log('Text:', text);
    });
  }

  ngOnInit() {
    this.#dataService.isInstalled().subscribe((value) => {
      this.$manual.set(value);
    });
  }

  toggleChild() {
    this.$showChild.update((value) => !value);
  }

  increment() {
    this.$number.update((value) => value + 1);
  }

  emit() {
    this.onEvent.emit('event');
  }


}
