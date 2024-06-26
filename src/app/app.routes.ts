import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { MarketplaceComponent } from './Pages/marketplace/marketplace.component';
import { CartComponent } from './Pages/cart/cart.component';
import { OrderComponent } from './Pages/order/order.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';
import { ProfilePageComponent } from './Profile/profile-page/profile-page.component';
import { OrderDetailsComponent } from './Pages/order-details/order-details.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { DashboardComponent } from './BackOfficePages/AdminSection/dashboard/dashboard.component';
import { authGuard } from './Auth/AuthServices/auth.guard';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { QrScannerComponent } from './Components/qr-scanner/qr-scanner.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { SettingsComponent } from './Profile/settings/settings.component';
import { AccountSettingsComponent } from './Profile/account-settings/account-settings.component';
import { DeveloperSettingsComponent } from './Profile/developer-settings/developer-settings.component';
import { DeliverySettingsComponent } from './Profile/delivery-settings/delivery-settings.component';
import { CategoryCrudComponent } from './BackOfficePages/AdminSection/category-crud/category-crud.component';
import { ListProductComponent } from './BackOfficePages/AdminSection/list-product/list-product.component';
import { ListOrderComponent } from './BackOfficePages/AdminSection/list-order/list-order.component';
import { DeliveryOrdersComponent } from './BackOfficePages/DeliverySection/delivery-orders/delivery-orders.component';
import { ReportListComponent } from './BackOfficePages/AdminSection/report-list/report-list.component';
import { BlogComponent } from './Pages/blog/blog.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'product/:productId', component: ProductPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      {
        path: 'account',
        component: AccountSettingsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'notification',
        component: NotificationComponent,
        canActivate: [authGuard],
      },
      {
        path: 'delivery',
        component: DeliverySettingsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'developer',
        component: DeveloperSettingsComponent,
        canActivate: [authGuard],
      },
    ],
  },

  { path: 'orderDetails/:orderId', component: OrderDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'QrScanner', component: QrScannerComponent },
  { path: 'Notification', component: NotificationComponent },
  {
    path: 'list-order-delivery',
    component: DeliveryOrdersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'add-product', pathMatch: 'full' },

      {
        path: 'add-product',
        loadComponent: () =>
          import(
            './BackOfficePages/AdminSection/add-product/add-product.component'
          ).then((mod) => mod.AddProductComponent),
        canActivate: [authGuard],
      },
      {
        path: 'update-product/:productId',
        loadComponent: () =>
          import(
            './BackOfficePages/AdminSection/update-product/update-product.component'
          ).then((mod) => mod.UpdateProductComponent),
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        component: CategoryCrudComponent,
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
        path: 'list-report',
        component: ReportListComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error-page' },
];
