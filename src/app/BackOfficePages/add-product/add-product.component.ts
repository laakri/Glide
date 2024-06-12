import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { ToastService } from '../../Services/toast.service';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnInit {
  selectedFile: File | null = null;
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response && response.$values) {
        this.categories = response.$values;
      }
    });
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  submitAddProduct(addProductForm: NgForm) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(addProductForm.value)) {
      formData.append(key, value as string);
      console.log(formData);
    }
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.productService.addProduct(formData).subscribe(
      (response) => {
        this.toastService.showToast('Product added successfully .', 'success');
        // addProductForm.reset();
      },
      (error) => {
        this.toastService.showToast('Error adding product .', 'error');
      }
    );
  }
}
