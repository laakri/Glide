import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { MarketplaceComponent } from './Pages/marketplace/marketplace.component';
import { CartComponent } from './Pages/cart/cart.component';
import { OrderComponent } from './Pages/order/order.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { OrderDetailsComponent } from './Pages/order-details/order-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'orderDetails', component: OrderDetailsComponent },
];
