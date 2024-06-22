import { ToastService } from './../../Services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  productId!: number;
  product!: Product;
  ratingValue: number = 5;
  ratingDescription: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
      this.getProduct();
    });
  }

  getProduct(): void {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
        console.log(this.product);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getStockClass(): string {
    if (!this.product || this.product.stock === undefined) {
      return '';
    } else if (this.product.stock <= 0) {
      return 'badge-error';
    } else if (this.product.stock <= 10) {
      return 'badge-warning';
    } else {
      return 'badge-success';
    }
  }

  rateProduct() {
    const rating: any = {
      Score: this.ratingValue,
      Comment: this.ratingDescription,
    };
    console.log(rating);
    this.productService.rateProduct(this.productId, rating).subscribe(
      (response) => {
        this.toastService.showToast('Rating submitted', 'success');
        this.getProduct();
      },
      (error) => {
        this.toastService.showToast('Error submitting rating', 'error');
      }
    );
  }
}
