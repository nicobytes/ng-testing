import { Component, Input, SimpleChanges, OnChanges, input, effect, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [JsonPipe],
  template: `
   <article>
      <h1>Child Component</h1>
      <p>{{ firstName() }}</p>
      <p>Age: {{ age() }}</p>
      <p>Double Age: {{ doubleAge() }}</p>
      <p>Products: {{ products().length }}</p>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  firstName = input('Nicolas');
  age = input.required<number>();
  products = input.required<Product[]>();
  doubleAge = computed(() => this.age() * 2);

  constructor() {
    effect(() => {
      const age = this.age();
      this.runAgeLogic();
    })
    effect(() => {
      const fistName = this.firstName();
      console.log('First Name:', fistName);
    })
    effect(() => {
      const products = this.products();
      console.log('Products:', products);
    })
  }

  runAgeLogic(): void {
    // fetch
    console.log('Age:', this.age());
  }

  runProductLogic(): void {
    console.log('Products:', this.products);
  }

}
