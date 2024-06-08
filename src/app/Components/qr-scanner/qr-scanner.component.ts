import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToastService } from '../../Services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [ZXingScannerModule, CommonModule],
  templateUrl: './qr-scanner.component.html',
})
export class QrScannerComponent {
  verificationStatus: string = '';
  qrResultString: string = '';
  success: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ToastService: ToastService
  ) {}

  handleQrCodeResult(resultString: string): void {
    this.qrResultString = resultString;
    this.verifyQrCode(resultString);
  }

  verifyQrCode(qrData: string): void {
    if (!this.success) {
      const [orderId, userId] = qrData.split(',');

      const body = { orderId, userId };
      console.log(body);

      this.http
        .post('http://localhost:5152/api/orders/verify-qr', body)
        .subscribe({
          next: (response: any) => {
            this.verificationStatus =
              'Order status updated to Delivered successfully.';
            this.ToastService.showToast(
              'Order status updated to Delivered successfully.',
              'success'
            );
            this.success = true;
          },
          error: (error) => {
            console.error('Verification failed', error);
            this.verificationStatus = 'Verification failed. Please try again.';
          },
        });
    }
  }

  redirectToHome(): void {
    this.router.navigate(['/marketplace']);
  }
}
