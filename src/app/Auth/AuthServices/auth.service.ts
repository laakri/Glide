import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5152/api/Users/';
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.hasToken());
  private userData: any;

  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private oAuthService: OAuthService
  ) {
    this.initConfiguration();
  }

  private initConfiguration() {
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

    // Check if already logged in via Google OAuth
    if (this.oAuthService.hasValidAccessToken()) {
      const idToken = this.oAuthService.getIdToken();
      this.storeGoogleToken(idToken);
    }
  }

  login(): void {
    this.oAuthService.initImplicitFlow();
    this.oAuthService.events.subscribe((event) => {
      localStorage.setItem('event', event.type);

      // if (event.type === 'token_received') {}
      const idToken = this.oAuthService.getIdToken();
      this.storeGoogleToken(idToken);
    });
  }

  private storeGoogleToken(idToken: string): void {
    console.log(this.oAuthService.getIdentityClaims());
    localStorage.setItem('google_token', 'google_tokengoogle_token');

    this.googleSignin(idToken).subscribe(
      (response) => {
        this.tokenService.setToken(response.token);
        this.loggedIn.next(true);
      },
      (error) => {
        console.error('Error storing Google token:', error);
        // Handle error
      }
    );
  }

  googleSignin(idToken: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'GoogleLogin', { idToken }).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  registerUser(userData: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + 'Register', userData)
      .pipe(catchError(this.handleError));
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Login', userData).pipe(
      tap((response: { token: string }) => {
        if (response.token) {
          this.tokenService.setToken(response.token);
          this.loggedIn.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logoutUser(): void {
    this.tokenService.removeToken();
    localStorage.removeItem('jwt');
    localStorage.removeItem('google_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.oAuthService.revokeTokenAndLogout();
  }

  getUserData(): any {
    const token =
      this.tokenService.getToken() || localStorage.getItem('google_token');
    if (token) {
      this.userData = jwtDecode(token);
      return this.userData;
    } else {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error || errorMessage;
    }
    return throwError(errorMessage);
  }
}
