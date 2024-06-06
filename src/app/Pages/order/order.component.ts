import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Product } from '../../Models/product.model';
import { OrderService } from '../../Services/order.service';
import { ToastService } from '../../Services/toast.service';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private orderService: OrderService,
    private toastService: ToastService,
    private cartService: CartService,
    private router: Router
  ) {
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
    if (this.cartItems.length === 0) {
      this.router.navigate(['/marketplace']);
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

    this.orderService.submitOrder(orderDetails).subscribe(
      (response) => {
        this.toastService.showToast('Order created successfully .', 'success');
        this.cartService.clearCart();
        this.router.navigate(['/marketplace']);
      },
      (error) => {
        console.error(error);
        this.toastService.showToast('Error creating Order .', 'error');
      }
    );
  }
}
