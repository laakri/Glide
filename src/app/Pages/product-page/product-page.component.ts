import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  productId!: number;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
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
      return 'text-red-400';
    } else if (this.product.stock <= 10) {
      return 'text-yellow-400';
    } else {
      return 'text-green-400';
    }
  }
}
