import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-orders.component.html',
})
export class DeliveryOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrdersForDelivery().subscribe((response: any) => {
      if (response && response.$values) {
        this.orders = response.$values;
        console.log(this.orders);
      }
    });
  }

  markOrderAsReadyForPickup(orderId: number): void {
    this.orderService.markOrderAsReadyForPickup(orderId).subscribe(
      (response) => {
        console.log(response.message);
        this.loadOrders();
      },
      (error) => {
        console.error('Error marking order as ready for pickup', error);
      }
    );
  }
  getOrderStatusText(status: any): {
    text: string;
    color: string;
  } {
    switch (status) {
      case 0:
        return { text: 'Pending ...', color: 'text-primary' };
      case 1:
        return { text: 'Processing', color: 'badge-warning' };
      case 2:
        return { text: 'Ready for Pickup', color: 'badge-info' };
      case 3:
        return { text: 'Delivered', color: 'badge-success' };
      case 4:
        return { text: 'Cancelled', color: 'badge-error' };
      default:
        return { text: 'Unknown', color: '' };
    }
  }
}
