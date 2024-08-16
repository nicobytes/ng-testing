import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <article>
      <h1>Child Component</h1>
      <p>Firstname: {{ firstName }}</p>
      <p>Age: {{ age }}</p>
      <p>Products: {{ products.length }}</p>
    </article>
  `
})
export class ChildComponent implements OnChanges {

  @Input() firstName = 'Nicolas';
  @Input() age = 0;
  @Input() products: Product[] = [];

  /*
  _firstName = '';
  @Input()
  set firstName(name: string) {
    console.log('Setting products:', name);
    this._firstName = name;
  }
  */

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes);
  }

  runAgeLogic(): void {
    console.log('Age:', this.age);
  }

}
