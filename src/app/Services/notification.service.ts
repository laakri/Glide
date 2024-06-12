import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscriber, of, switchMap } from 'rxjs';
import { AuthService } from '../Auth/AuthServices/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private baseUrl = 'http://localhost:5152/api/Notification';
  isLoggedIn: boolean = false;
  userData: any;

  constructor(private http: HttpClient, private authService: AuthService) {}
  getNotifications(): Observable<any> {
    return this.authService.isLoggedIn().pipe(
      switchMap((loggedIn: boolean) => {
        if (loggedIn) {
          const userId = this.authService.getUserData().userId;
          return new Observable<any>((observer) => {
            const eventSource = new EventSource(
              `${this.baseUrl}/subscribe/${userId}`
            );
            eventSource.onmessage = (event) => {
              observer.next(JSON.parse(event.data));
            };
            eventSource.onerror = (error) => {
              observer.error(error);
            };
            return () => eventSource.close();
          });
        } else {
          return of(null);
        }
      })
    );
  }

  markNotificationAsRead(notificationId: number): Observable<any> {
    console.log(notificationId);
    return this.http.put(`${this.baseUrl}/${notificationId}/read`, {});
  }
  getUnreadCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/unreadCount`);
  }
}
