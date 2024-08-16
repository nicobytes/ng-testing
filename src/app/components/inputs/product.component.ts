import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:  `
  <article>
    @let data = product();
    <h4>{{ data.title }}</h4>
    <img width="200" height="200" [src]="data.images[0]" [alt]="data.title">
    <p>{{ data.price | currency }}</p>
  </article>`,
})
export class ProductComponent {

  product = input.required<Product>();

}
