import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ToastService } from '../../Services/toast.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  signUp(signUpForm: NgForm) {
    const userData: Record<string, any> = {};
    for (const [key, value] of Object.entries(signUpForm.value)) {
      userData[key] = value;
    }
    this.authService.registerUser(userData).subscribe(
      (response) => {
        this.toastService.showToast('Registration successful. ', 'success');
        console.log('Registration successful', response);
      },
      (error) => {
        this.toastService.showToast(error, 'error');
        console.error('Registration failed', error);
      }
    );
  }
}
