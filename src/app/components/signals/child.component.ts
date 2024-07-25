import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: `<p>{{ $total() }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  $number  = input.required<number>({alias: 'number'});
  $total = computed(() => this.$number() + 1);

  $categories  = input.required<string[]>({alias: 'categories'});
  $categoriesToShow = computed(() => this.$categories().filter(category => category.length > 3));

  readonly readNumber = effect(() => {
    const number = this.$number();
    console.log('Number:', number);
  });

}
