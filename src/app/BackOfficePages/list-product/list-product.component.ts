import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent {
  products!: Product[];
  ProductDeleteId!: number;

  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {}

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

  deleteProduct(productId: number): void {
    this.ProductDeleteId = productId;
  }
  confirmDelete(): void {
    this.productService.deleteProduct(this.ProductDeleteId).subscribe(
      () => {
        this.toastService.showToast('Product deleted successfully.', 'success');
        this.products = this.products.filter(
          (p) => p.id !== this.ProductDeleteId
        );
      },
      (error) => {
        this.toastService.showToast('Error deleting product.', 'error');
        console.error('Error deleting product:', error);
      }
    );
  }
}
