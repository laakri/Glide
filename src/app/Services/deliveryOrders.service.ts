import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5152/api/Orders';

  constructor(private http: HttpClient) {}

  updateOrderStatus(orderId: number, status: number): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/status`;
    return this.http.put(url, { status });
  }

  getOrdersForAdmin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/orders`);
  }

  getOrdersForDelivery(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/delivery/orders`);
  }

  markOrderAsReadyForPickup(orderId: number): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/readyforpickup`;
    return this.http.put(url, {});
  }
}
