import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../Services/product.service';
import { ToastService } from '../../../Services/toast.service';
import { CategoryService } from '../../../Services/category.service';

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

    // Log the raw form values first
    console.log("Raw Form Values:", addProductForm.value);

    // Process colors and sizes before adding to FormData
    const colors = addProductForm.value.colors
        ? addProductForm.value.colors.split(' ').map((color: string) => color.trim())
        : [];
    const sizes = addProductForm.value.sizes
        ? addProductForm.value.sizes.split(' ').map((size: string) => size.trim())
        : [];

    console.log("Processed Colors:", colors);
    console.log("Processed Sizes:", sizes);

    // Add basic form fields to FormData
    for (const [key, value] of Object.entries(addProductForm.value)) {
        if (key !== 'colors' && key !== 'sizes') {
            formData.append(key, value as string);
            console.log(`Form field - ${key}:`, value);
        }
    }

    // Add file if selected
    if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
        console.log("Selected File:", this.selectedFile.name);
    }

    // Add processed arrays as JSON strings
    formData.append('colors', JSON.stringify(colors));
    formData.append('sizes', JSON.stringify(sizes));

    // Log all form data values using forEach
    console.log("Final FormData values:");
    formData.forEach((value, key) => {
        console.log(key, value);
    });

    // Now send the request
    this.productService.addProduct(formData).subscribe({
        next: (response) => {
            console.log("Success Response:", response);
            this.toastService.showToast('Product added successfully.', 'success');
        },
        error: (error) => {
            console.log("Error Response:", error);
            this.toastService.showToast('Error adding product.', 'error');
        }
    });
  }
}
