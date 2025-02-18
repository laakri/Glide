import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Product } from '../../Models/product.model';
import { OrderService } from '../../Services/order.service';
import { ToastService } from '../../Services/toast.service';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];
  cartTotal: number = 0;
  isBrowser: boolean;
  formSubmitted = false;
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
    console.log('Form submitted', orderForm.value);

    if (orderForm.invalid) {
      console.log('Form is invalid', orderForm.errors);
      this.toastService.showToast('Please fill in all required fields.', 'error');
      return;
    }

    const orderRequest = {
      total: this.cartTotal,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      city: this.city,
      postalCode: this.postalCode,
      items: this.cartItems.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price
        },
        quantity: item.quantity
      }))
    };

    console.log('Sending order request:', orderRequest);

    this.orderService.submitOrder(orderRequest).subscribe({
      next: (response) => {
        console.log('Order success:', response);
        this.toastService.showToast('Order created successfully.', 'success');
        this.cartService.clearCart();
        this.router.navigate(['/marketplace']);
      },
      error: (error) => {
        console.error('Order error:', error);
        if (error.error?.message) {
          this.toastService.showToast(`Error: ${error.error.message}`, 'error');
        } else {
          this.toastService.showToast('Error creating order. Please try again.', 'error');
        }
      }
    });
  }
}
