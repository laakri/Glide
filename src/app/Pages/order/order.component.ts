import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Product } from '../../Models/product.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];
  cartTotal: number = 0;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadCartItems();
    }
  }

  private loadCartItems() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.calculateTotal();
    }
  }

  private calculateTotal() {
    this.cartTotal = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  submitOrder(orderForm: NgForm) {
    const orderDetails: Record<string, any> = { items: this.cartItems };
    for (const [key, value] of Object.entries(orderForm.value)) {
      orderDetails[key] = value;
    }

    console.log('Order Details:', orderDetails);
  }
}
