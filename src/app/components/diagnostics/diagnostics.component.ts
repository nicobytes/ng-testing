import { Component, inject } from '@angular/core';
import { ProductsService } from '@services/product.service';

@Component({
  selector: 'app-diagnostics',
  standalone: true,
  imports: [],
  template: `<button (event)="store.getAll()">Click</button>`,
})
export class DiagnosticsComponent {

  readonly store = inject(ProductsService);

}
