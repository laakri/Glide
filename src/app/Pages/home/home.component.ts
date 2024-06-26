import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  ProductFakeList = [
    'https://i.gyazo.com/a53a5f06d81b6361b7023c9fc61ca3ca.png',
    'https://i.gyazo.com/61e4242c11d0ed191e777d4a6356dc4c.png',
    'https://i.gyazo.com/e6220faac95c162ebda5cb1ee3bc19ed.png',
  ];
}
