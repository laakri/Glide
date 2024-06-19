import { ToastService } from './../../Services/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderService } from '../../Services/order.service';
import { AuthService } from '../../Auth/AuthServices/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../Services/report.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  orders: any[] = [];
  isLoggedIn: boolean = false;
  reportUserId = '';
  reportOrderId = '';
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private reportService: ReportService,
    private toastService: ToastService
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
  reportOrder(orderId: any, userId: any) {
    this.reportUserId = userId;
    this.reportOrderId = orderId;
  }
  submitProfile(form: NgForm) {
    if (form.valid) {
      console.log('Profile Data:', form.value);
    }
  }
  onSubmit(addReportForm: NgForm) {
    const reportRequest: any = {
      orderId: this.reportOrderId,
      description: addReportForm.value.description,
    };
    this.reportService.createReport(reportRequest).subscribe(
      (response) => {
        this.toastService.showToast('Report created successfully', 'success');
      },
      (error) => {
        console.log(error);
        this.toastService.showToast('Error creating report', 'error');
      }
    );
  }
}
