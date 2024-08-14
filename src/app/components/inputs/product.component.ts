import { Component, input, Input } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  template: '<h1>{{ product().title }}</h1>',
})
export class ProductComponent {

  product = input.required<Product>();

}
