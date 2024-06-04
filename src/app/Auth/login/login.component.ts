import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
declare const gapi: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private clientId =
    '650287733782-pcmh272bgib136vil0duc65q30rsoukf.apps.googleusercontent.com';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleAuthLibrary();
    }
  }

  loadGoogleAuthLibrary() {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        gapi.load('auth2', () => {
          gapi.auth2.init({
            client_id: this.clientId,
          });
        });
      };
      document.body.appendChild(script);
    }
  }

  async handleAuthClick() {
    if (typeof gapi !== 'undefined' && gapi.auth2) {
      const auth2 = gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      const id_token = googleUser.getAuthResponse().id_token;

      this.http
        .post<any>('http://localhost:5152/api/Users/GoogleLogin', {
          idToken: id_token,
        })
        .subscribe(
          (response) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error logging in with Google', error);
          }
        );
    } else {
      console.error('Google API not initialized');
    }
  }
}
