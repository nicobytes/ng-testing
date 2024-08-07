import { Component, OnInit, inject } from '@angular/core';
import { Product } from '@models/product.model';

import { ProductsService } from '@services/product.service';
import { ValueService } from '@services/value.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [ProductComponent],
})
export class ProductsComponent implements OnInit {
  #productsService = inject(ProductsService);
  #valueService = inject(ValueService);

  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rta = '';

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.#productsService.getAll(this.limit, this.offset).subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: () => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 1000);
      },
    });
  }

  async callPromise() {
    const rta = await this.#valueService.getPromiseValue();
    this.rta = rta;
  }
}
