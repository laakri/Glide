import { Component } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css',
})
export class MarketplaceComponent {
  table: any = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
}
