import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
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
      this.order.orderItems.forEach((item: any) => {
        this.total += item.product.price * item.quantity;
      });
    }
  }

  editProfile() {
    console.log('Edit Profile button clicked');
  }
}
