import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: `<p>{{ $total() }}</p>`,
})
export class ChildComponent {

  $number  = input.required<number>({alias: 'number'});
  $total = computed(() => this.$number() + 1);

}
