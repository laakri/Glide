import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Auth/AuthServices/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen: boolean = false;
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }
  logout(): void {
    this.authService.logoutUser();
  }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
