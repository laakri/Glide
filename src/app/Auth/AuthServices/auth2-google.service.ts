import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  constructor(
    private oAuthService: OAuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.initConfiguration();
  }

  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId:
        '650287733782-pcmh272bgib136vil0duc65q30rsoukf.apps.googleusercontent.com',
      redirectUri: 'http://localhost:4200',
      scope: 'openid profile email',
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oAuthService.initImplicitFlow();
    this.oAuthService.events.subscribe((event) => {
      if (event.type === 'token_received') {
        const idToken = this.oAuthService.getIdToken();
        this.sendTokenToBackend(idToken);
      }
    });
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
  }

  private sendTokenToBackend(idToken: string) {
    this.http
      .post<any>('http://localhost:5152/api/Users/GoogleLogin', { idToken })
      .subscribe(
        (response) => {
          console.log('Token sent to backend successfully');
          // Optionally handle response from backend
        },
        (error) => {
          console.error('Error sending token to backend', error);
          // Optionally handle error
        }
      );
  }
}
