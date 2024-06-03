import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  submitAddProduct(addProductForm: NgForm) {
    const addProductDetails: Record<string, any> = {};
    for (const [key, value] of Object.entries(addProductForm.value)) {
      addProductDetails[key] = value;
    }

    console.log('addProduct Details:', addProductDetails);
  }
}
