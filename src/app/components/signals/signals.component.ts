import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '@services/data.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [FormsModule],
  providers: [DataService],
  templateUrl: './signals.component.html',
})
export class SignalsComponent implements OnInit {
  #dataService = inject(DataService);
  $isInstalled = toSignal(this.#dataService.isInstalled(), {
    initialValue: false,
  });

  $manual = signal(true);
  $text = signal('texto');
  $input = input.required({ alias: 'id' });
  $lastname = input('', { alias: 'lastname' });
  $value = computed(() => this.$input());

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
}
