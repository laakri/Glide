import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../Models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5152/api/Orders';

  constructor(private http: HttpClient) {}

  submitOrder(orderDetails: Record<string, any>): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderDetails).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  getOrdersForAdmin(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/admin/orders`);
  }

  updateOrderStatus(orderId: number, status: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}/status`, { status });
  }
}
