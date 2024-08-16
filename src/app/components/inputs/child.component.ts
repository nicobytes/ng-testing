import { Component, Input, SimpleChanges, OnChanges, input, effect, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-child',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <h1>Child Component</h1>
      <p>Firstname: {{ firstName() }}</p>
      <p>Age: {{ age() }}</p>
      <p>Double: {{ doubleAge() }}</p>
      <p>Products: {{ products().length }}</p>
    </article>
  `
})
export class ChildComponent {

  firstName = input.required<string>();
  age = input.required<number>();
  doubleAge = computed(() => this.age() * 2);
  products = input.required<Product[]>();

}
