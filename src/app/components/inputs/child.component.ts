import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [JsonPipe],
  template: `
   <article>
      <h1>Child Component</h1>
      <p>{{ firstName }}</p>
      <p>{{ age }}</p>
      <p>Products: {{ _products.length }}</p>
      <p>{{ _products | json }}</p>
    </article>
  `
})
export class ChildComponent implements OnChanges {

  @Input() firstName = 'Nicolas';
  @Input() age = 0;
  // @Input() products: Product[] = [];

  
  _products: Product[] = [];
  @Input()
  set products(products: Product[]) {
    console.log('Setting products:', products);
    this._products = products;
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['age']) {
      this.runAgeLogic();
    }
    if (changes['products']) {
      this.runProductLogic();
    }
  }

  runAgeLogic(): void {
    console.log('Age:', this.age);
  }

  runProductLogic(): void {
    console.log('Products:', this.products);
  }

}
