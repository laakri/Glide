import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthServices/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthGoogleService } from '../AuthServices/auth2-google.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  signInWithGoogle() {
    this.authService.login();
  }

  onLogin(loginForm: NgForm): void {
    const userData: Record<string, any> = {};
    for (const [key, value] of Object.entries(loginForm.value)) {
      userData[key] = value;
    }
    this.authService.loginUser(userData).subscribe(
      (response) => {
        this.router.navigate(['/marketplace']);
      },
      (error) => console.error(error)
    );
  }
}
