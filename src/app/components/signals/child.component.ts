import { ChangeDetectionStrategy, Component, computed, effect, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [FormsModule],
  template: `
    <p>{{ $total() }}</p>
    <p>
      <input type="text" [(ngModel)]="$value">
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  $number  = input.required<number>({alias: 'number'});
  $total = computed(() => this.$number() + 1);
  $value = model('', {alias: 'value'});

  $categories  = input.required<string[]>({alias: 'categories'});
  $categoriesToShow = computed(() => this.$categories().filter(category => category.length > 3));

  readonly readNumber = effect(() => {
    const number = this.$number();
    console.log('Number:', number);
  });

}
