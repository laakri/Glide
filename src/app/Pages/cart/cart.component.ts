// cart.component.ts
import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  increaseQuantity(productId: number) {
    this.cartService.updateQuantity(productId, this.getQuantity(productId) + 1);
  }

  decreaseQuantity(productId: number) {
    this.cartService.updateQuantity(productId, this.getQuantity(productId) - 1);
  }

  getQuantity(productId: number): number {
    const item = this.cartService.cartItems.find(
      (item) => item.product.id === productId
    );
    return item ? item.quantity : 0;
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getCartTotal(): number {
    return this.cartService.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}
