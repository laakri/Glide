import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5152/api/products';

  constructor(private http: HttpClient) {}

  addProduct(productData: any): Observable<any> {
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
  deleteProduct(productId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(deleteUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  searchProducts(
    nameOrDescription?: string,
    categories?: string[],
    minPrice?: number,
    maxPrice?: number
  ): Observable<Product[]> {
    const searchParams = new URLSearchParams();
    if (nameOrDescription) {
      searchParams.set('nameOrDescription', nameOrDescription);
    }
    if (categories && categories.length > 0) {
      searchParams.set('categories', categories.join(','));
    }
    if (minPrice) {
      searchParams.set('minPrice', minPrice.toString());
    }
    if (maxPrice) {
      searchParams.set('maxPrice', maxPrice.toString());
    }

    const searchUrl = `${this.apiUrl}/search?${searchParams.toString()}`;
    return this.http.get<Product[]>(searchUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
