import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
}
