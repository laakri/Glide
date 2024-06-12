import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SseService } from '../../Services/notification.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [SseService],
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private sseService: SseService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.sseService.getNotifications().subscribe(
      (newNotification) => {
        this.notifications.unshift(newNotification);
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error receiving notification:', error);
      }
    );
  }

  markAsRead(notificationId: number): void {
    this.sseService.markNotificationAsRead(notificationId);
    this.fetchNotifications();
  }
}
