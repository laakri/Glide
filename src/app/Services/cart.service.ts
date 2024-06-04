import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';
import { ToastService } from './toast.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';
  cartItems: { product: Product; quantity: number }[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  constructor(private toastService: ToastService) {
    if (this.isLocalStorageAvailable()) {
      this.loadCart();
    }
  }

  private loadCart() {
    const storedCart = localStorage.getItem(this.cartKey);
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.updateCartItemCount();
    }
  }

  private saveCart() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
    this.updateCartItemCount();
  }

  private updateCartItemCount() {
    const uniqueItemCount = this.cartItems.length;
    this.cartItemCount.next(uniqueItemCount);
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      this.toastService.showToast(
        `Item ${product.name} is already in the cart!`,
        'info'
      );
    } else {
      this.cartItems.push({ product, quantity: 1 });
      this.saveCart();
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }
}
