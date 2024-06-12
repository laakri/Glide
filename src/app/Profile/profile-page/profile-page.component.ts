import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderService } from '../../Services/order.service';
import { AuthService } from '../../Auth/AuthServices/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  orders: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.user = this.authService.getUserData();
        this.orderService
          .getOrdersByUserId(this.user.userId)
          .subscribe((data: any) => {
            if (data && data.$values) {
              this.orders = data.$values;
            }
          });
      } else {
        this.router.navigate(['/error']);
      }
    });
  }
  viewOrder(orderId: number) {
    this.router.navigate(['/orderDetails', orderId]);
  }
  editProfile() {
    console.log('Edit Profile button clicked');
  }

  submitProfile(form: NgForm) {
    if (form.valid) {
      console.log('Profile Data:', form.value);
    }
  }
}
