import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  products: { id: number; quantity: number }[] = [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 1 },
  ];

  increaseQuantity(productId: number) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.quantity++;
    }
  }

  decreaseQuantity(productId: number) {
    const product = this.products.find((p) => p.id === productId);
    if (product && product.quantity > 1) {
      product.quantity--;
    }
  }
}
