import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5152/api/Users/';
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.hasToken());

  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

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
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
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
