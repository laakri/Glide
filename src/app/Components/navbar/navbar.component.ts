import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../Auth/AuthServices/auth.service';
import { NotificationComponent } from '../notification/notification.component';
import { SseService } from '../../Services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    NotificationComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen: boolean = false;
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;
  userData: any;
  unreadNotifications: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private sseService: SseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userData = this.authService.getUserData();
        this.fetchNotifications();
      }
    });
  }

  logout(): void {
    this.authService.logoutUser();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  fetchNotifications() {
    this.sseService.getNotifications().subscribe(
      async (newNotification) => {
        if (typeof newNotification === 'object' && newNotification !== null) {
          if (!newNotification.IsRead) this.unreadNotifications++;
          this.cd.detectChanges();
        } else {
          console.error('Invalid data received:', newNotification);
        }
      },
      (error) => {
        console.error('Error receiving notification:', error);
      }
    );
  }
}
