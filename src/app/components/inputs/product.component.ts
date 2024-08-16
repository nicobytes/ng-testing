import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe],
  template:  `
  <article>
    <h4>{{ product.title }}</h4>
    <img width="200" height="200" [src]="product.images[0]" [alt]="product.title">
    <p>{{ product.price | currency }}</p>
  </article>`,
})
export class ProductComponent {

  @Input() product!: Product;

}
