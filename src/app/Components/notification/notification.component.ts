import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { Notification } from '../../Models/notification.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  notificationSubscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.startConnection();
    this.notificationService.addNotificationListener();
    this.notificationSubscription = this.notificationService
      .getNotifications()
      .subscribe((notification) => {
        this.notifications.push(notification);
      });
  }

  ngOnDestroy(): void {
    this.notificationService.stopConnection();
    this.notificationSubscription.unsubscribe();
  }
}
