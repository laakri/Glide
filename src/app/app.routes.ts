import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { MarketplaceComponent } from './Pages/marketplace/marketplace.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marketplace', component: MarketplaceComponent },
];
