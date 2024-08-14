import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '@models/product.model';
import { ChildComponent } from './child.component';
import { ProductComponent } from './product.component';
import { ProductsService } from '@services/product.service';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, FormsModule, ProductComponent],
  template: `
    <div class="container">
      <article>
        <h1>Parent Component</h1>
        <input type="text" [(ngModel)]="firstName" />
        <input type="number" [(ngModel)]="age" />
        <button type="button" (click)="addProduct()">Add Product</button>
        <p>Products: {{ products().length }}</p>
      </article>
      <hr />
      <app-child [firstName]="firstName()" [age]="age()" [products]="products()" />
      @for(product of products(); track product.id){
        <app-product [product]="product" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent implements OnInit {

  firstName = signal('Nicolas');
  age = signal(0)
  products = signal<Product[]>([]);

  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products.set(products);
    });
  }

  addProduct(): void {
    const newProduct = {
      id: '3',
      title: 'Product 3',
      price: 300,
      description: 'Description 3',
      images: ['image5.jpg', 'image6.jpg'],
      category: {
        id: '3',
        name: 'Category 3',
      }
    };
    this.products.update((products) => [...products, newProduct]);
  }
}
