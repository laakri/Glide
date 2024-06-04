import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5152/api/Users/';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post<any>(this.apiUrl + 'Register', userData).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error || errorMessage;
        }
        return throwError(errorMessage);
      })
    );
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Login', userData);
  }
}
