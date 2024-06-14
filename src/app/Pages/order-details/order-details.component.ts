import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent implements OnInit {
  order: any = {};
  total: number = 0;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    const orderId: any = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe(
        (order) => {
          this.order = order;
          console.log(this.order);
          this.calculateTotal();
        },
        (error) => {
          console.error('Error fetching order:', error);
          this.router.navigate(['/error-page']);
        }
      );
    }
  }

  calculateTotal() {
    this.total = 0;
    if (this.order.orderItems) {
      this.order.orderItems.$values.forEach((item: any) => {
        this.total += item.product.price * item.quantity;
      });
    }
    console.log(this.total);
  }

  editProfile() {
    console.log('Edit Profile button clicked');
  }
  getOrderStatusText(status: any): {
    text: string;
    color: string;
  } {
    switch (status) {
      case 0:
        return { text: 'Pending ...', color: 'badge-warning' };
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
