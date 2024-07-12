import { Component, Input } from '@angular/core';
import { Product } from '@models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class ProductComponent {
  @Input() product!: Product;

  constructor() {}
}
