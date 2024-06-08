import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../Models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private hubConnection!: HubConnection;
  private notificationsSubject: Subject<Notification> =
    new Subject<Notification>();

  constructor() {}

  // Connect to SignalR hub
  startConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5152/notification')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err) =>
        console.error('Error while starting SignalR connection: ' + err)
      );
  }

  // Listen for incoming notifications
  addNotificationListener(): void {
    this.hubConnection.on(
      'ReceiveNotification',
      (notification: Notification) => {
        this.notificationsSubject.next(notification);
      }
    );
  }

  // Get notifications observable
  getNotifications(): Observable<Notification> {
    return this.notificationsSubject.asObservable();
  }

  // Stop SignalR connection
  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
