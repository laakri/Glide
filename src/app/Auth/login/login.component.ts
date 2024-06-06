import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthServices/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

declare const gapi: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private clientId =
    '650287733782-pcmh272bgib136vil0duc65q30rsoukf.apps.googleusercontent.com';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.loadGoogleAuthLibrary();
  // }

  // loadGoogleAuthLibrary() {
  //   const script = document.createElement('script');
  //   script.src = 'https://apis.google.com/js/api.js';
  //   script.onload = () => {
  //     gapi.load('auth2', () => {
  //       gapi.auth2.init({
  //         client_id: this.clientId,
  //       });
  //     });
  //   };
  //   document.body.appendChild(script);
  // }

  // async handleAuthClick() {
  //   const auth2 = gapi.auth2.getAuthInstance();
  //   const googleUser = await auth2.signIn();
  //   const id_token = googleUser.getAuthResponse().id_token;

  //   this.http
  //     .post<any>('http://localhost:5152/api/Users/GoogleLogin', {
  //       idToken: id_token,
  //     })
  //     .subscribe(
  //       (response) => {
  //         localStorage.setItem('token', response.token);
  //         // Redirect or navigate to the dashboard upon successful login
  //       },
  //       (error) => {
  //         console.error('Error logging in with Google', error);
  //       }
  //     );
  // }
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
