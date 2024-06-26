import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../Auth/AuthServices/auth.service';
import { NotificationComponent } from '../notification/notification.component';
import { SseService } from '../../Services/notification.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../Services/theme.service';

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
  forest = false;
  theme = '';
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private sseService: SseService,
    private cd: ChangeDetectorRef,
    private themeService: ThemeService
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
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme == 'forest') {
        this.forest = true;
      } else {
        this.forest = false;
      }
    }
  }

  changeTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme == 'forest') {
        this.forest = false;
        this.themeService.saveTheme('lofi');
      } else {
        this.forest = true;
        this.themeService.saveTheme('forest');
      }
    }
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
