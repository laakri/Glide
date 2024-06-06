import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'auth_token';
  private readonly TOKEN_KEY = 'auth-token';

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__local_storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      console.error('LocalStorage is not available');
    }
  }
  getToken(): any {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.tokenKey);
    } else {
      console.error('LocalStorage is not available');
    }
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
