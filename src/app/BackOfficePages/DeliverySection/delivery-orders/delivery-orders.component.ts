import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { OrderService } from '../../../Services/order.service';

@Component({
  selector: 'app-delivery-orders',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: './delivery-orders.component.html',
})
export class DeliveryOrdersComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = [];
  showOrderItems: boolean = false;
  qrData: string = '';

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
  SelectedProduct(selectedOrder: any) {
    this.selectedOrder = selectedOrder;
    this.qrData = `${selectedOrder.id},${selectedOrder.userId}`;
  }

  toggleOrderItemsVisibility() {
    this.showOrderItems = !this.showOrderItems;
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
