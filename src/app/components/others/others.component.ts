import { Component, OnInit } from '@angular/core';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/product.service';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss'],
  standalone: true,
  imports: [HighlightDirective, ReactiveFormsModule, FormsModule, ReversePipe],
})
export class OthersComponent implements OnInit {
  color = 'yellow';
  text = 'Un texto';
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }
}
