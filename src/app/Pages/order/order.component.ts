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
})
export class OrderComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];
  cartTotal: number = 0;
  isBrowser: boolean;
  formSubmitted = false;
  // Add these properties
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
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
    this.formSubmitted = true;

    if (orderForm.invalid) {
      this.toastService.showToast(
        'Please fill in all required fields.',
        'error'
      );
      return;
    }

    const orderRequest: any = {
      total: this.cartTotal,
      fullName: orderForm.value.fullName,
      email: orderForm.value.email,
      phone: orderForm.value.phone,
      address: orderForm.value.address,
      city: orderForm.value.city,
      postalCode: orderForm.value.postalCode,
      items: this.cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
    };

    this.orderService.submitOrder(orderRequest).subscribe(
      (response) => {
        this.toastService.showToast('Order created successfully.', 'success');
        this.cartService.clearCart();
        this.router.navigate(['/marketplace']);
      },
      (error) => {
        console.error(error);
        if (error.error && error.error.errors) {
          const errorMessages = Object.values(error.error.errors).flat();
          console.log(errorMessages.join(', '));
          this.toastService.showToast(
            'Error creating Order. Please try again.',
            'error'
          );
        } else {
          this.toastService.showToast(
            'Error creating Order. Please try again.',
            'error'
          );
        }
      }
    );
  }
}
