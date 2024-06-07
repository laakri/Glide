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
import { authGuard } from './Auth/AuthServices/auth.guard';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { ListOrderComponent } from './BackOfficePages/list-order/list-order.component';
import { DeliveryOrdersComponent } from './BackOfficePages/delivery-orders/delivery-orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'product/:productId', component: ProductPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'orderDetails/:orderId', component: OrderDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'add-product', pathMatch: 'full' },

      {
        path: 'add-product',
        loadComponent: () =>
          import('./BackOfficePages/add-product/add-product.component').then(
            (mod) => mod.AddProductComponent
          ),
        canActivate: [authGuard],
      },

      {
        path: 'list-product',
        component: ListProductComponent,
        canActivate: [authGuard],
      },
      {
        path: 'list-order',
        component: ListOrderComponent,
        canActivate: [authGuard],
      },
      {
        path: 'list-order-delivery',
        component: DeliveryOrdersComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error-page' },
];
