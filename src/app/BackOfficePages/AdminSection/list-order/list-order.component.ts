import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../Services/toast.service';
import { OrderService } from '../../../Services/order.service';
import { Order } from '../../../Models/order.model';

@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-order.component.html',
})
export class ListOrderComponent {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private ToastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadOrdersForAdmin();
  }

  loadOrdersForAdmin(): void {
    this.orderService.getOrdersForAdmin().subscribe(
      (response: any) => {
        if (response && response.$values) {
          this.orders = response.$values;
        }
      },
      (error) => {
        console.error('Error loading orders:', error);
      }
    );
  }

  updateOrderStatus(orderId: number, status: number): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      () => {
        console.log('Order status updated successfully.');
        this.ToastService.showToast(
          'Order Status Updated Successfully ',
          'success'
        ),
          this.loadOrdersForAdmin();
      },
      (error) => {
        this.ToastService.showToast('Error updating order status', 'error'),
          console.error('Error updating order status:', error);
      }
    );
  }

  getOrderStatusText(status: any): {
    text: string;
    color: string;
  } {
    switch (status) {
      case 'Pending':
        return { text: 'Pending ...', color: 'text-primary' };
      case 'Processing':
        return { text: 'Processing', color: 'badge-warning' };
      case 'ReadyForPickup':
        return { text: 'Ready for Pickup', color: 'badge-info' };
      case 'Delivered':
        return { text: 'Delivered', color: 'badge-success' };
      case 'Cancelled':
        return { text: 'Cancelled', color: 'badge-error' };
      default:
        return { text: 'Unknown', color: '' };
    }
  }
}
