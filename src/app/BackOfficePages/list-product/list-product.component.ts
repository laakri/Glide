import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent {
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  editProduct(product: Product): void {
    // Implement edit functionality
  }

  deleteProduct(product: Product): void {
    // Implement delete functionality
  }
}
