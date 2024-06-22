import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5152/api/products';

  constructor(private http: HttpClient) {}

  addProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getProductById(productId: number): Observable<Product> {
    const productUrl = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(productUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  deleteProduct(productId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(deleteUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  updateProduct(productId: number, productData: FormData): Observable<any> {
    const updateUrl = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(updateUrl, productData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  searchProducts(searchParams: string): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}/search?${searchParams}`;
    return this.http.get<Product[]>(searchUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
