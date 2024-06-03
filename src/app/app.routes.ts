// routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { MarketplaceComponent } from './Pages/marketplace/marketplace.component';
import { CartComponent } from './Pages/cart/cart.component';
import { OrderComponent } from './Pages/order/order.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { OrderDetailsComponent } from './Pages/order-details/order-details.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { DashboardComponent } from './BackOfficePages/dashboard/dashboard.component';
import { AddProductComponent } from './BackOfficePages/add-product/add-product.component';
import { ListProductComponent } from './BackOfficePages/list-product/list-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'orderDetails', component: OrderDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'add-product', pathMatch: 'full' },
      { path: 'add-product', component: AddProductComponent },
      { path: 'list-product', component: ListProductComponent },
    ],
  },
];
