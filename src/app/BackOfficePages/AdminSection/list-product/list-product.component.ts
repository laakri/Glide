import { Component } from '@angular/core';
import { ToastService } from '../../../Services/toast.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { Product } from '../../../Models/product.model';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-product.component.html',
})
export class ListProductComponent {
  products!: Product[];
  ProductDeleteId!: number;

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((response: any) => {
      if (response && response.$values) {
        this.products = response.$values;
      }
    });
  }

  editProduct(product: Product): void {
    this.router.navigate(['/dashboard/update-product', product.id]);
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
