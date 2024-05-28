import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  submitOrder(orderForm: NgForm) {
    const orderDetails: Record<string, any> = {};
    for (const [key, value] of Object.entries(orderForm.value)) {
      orderDetails[key] = value;
    }

    console.log('Order Details:', orderDetails);
  }
}
