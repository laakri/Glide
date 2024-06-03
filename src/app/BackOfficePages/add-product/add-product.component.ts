import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  submitAddProduct(addProductForm: NgForm) {
    const addProductDetails: Record<string, any> = {};
    for (const [key, value] of Object.entries(addProductForm.value)) {
      addProductDetails[key] = value;
    }
    this.productService.addProduct(addProductDetails).subscribe(
      (response) => {
        // Handle success response
        this.toastService.showToast('Product added successfully .', 'success');
        addProductForm.reset();
      },
      (error) => {
        // Handle error
        this.toastService.showToast('Error adding product .', 'error');
      }
    );
  }
}
