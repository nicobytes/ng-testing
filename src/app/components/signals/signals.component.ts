import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
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
  templateUrl: './signals.component.html',
})
export class SignalsComponent implements OnInit {
  control = new FormControl();
  #dataService = inject(DataService);
  $isInstalled = toSignal(this.#dataService.isInstalled(), {
    initialValue: false,
  });

  $manual = signal(true);
  $text = signal('texto');
  $input = input.required({ alias: 'id' });
  $lastname = input('', { alias: 'lastname' });
  $value = computed(() => this.$input());
  $showChild = signal(false);
  $number = signal(0);

  constructor() {
    effect(() => {
      const text = this.$text();
      console.log(text);
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


}
