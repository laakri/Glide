import { Component } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  products = [
    {
      id: 1,
      name: 'Nike Carboon',
      description: 'Zemlak, Daniel and Leannon Desktop Support Technician',
      price: 210,
      quantity: 1,
      image:
        'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
    },
    {
      id: 2,
      name: 'Adidas Runner',
      description: 'Professional shoes for running',
      price: 150,
      quantity: 2,
      image:
        'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
    },
  ];

  editProfile() {
    // Logic to navigate to the profile edit page or open a modal for editing profile
    console.log('Edit Profile button clicked');
  }
}
