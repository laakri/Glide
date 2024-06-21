import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../Services/toast.service';
import { Product } from '../../../Models/product.model';
import { ProductService } from '../../../Services/product.service';
import { CategoryService } from '../../../Services/category.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent implements OnInit {
  product: Product = {} as Product;
  selectedFile: File | null = null;
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');

    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe(
        (product) => {
          this.product = product;
          console.log(product);
        },
        (error) => {
          this.toastService.showToast(
            'Error fetching product details.',
            'error'
          );
        }
      );
    }
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

  submitUpdateProduct(updateProductForm: NgForm) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(updateProductForm.value)) {
      formData.append(key, value as string);
    }
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    formData.append('id', this.product.id.toString()); // Ensure the ID is included

    this.productService.updateProduct(this.product.id, formData).subscribe(
      (response) => {
        // Handle success response
        this.toastService.showToast('Product updated successfully.', 'success');
      },
      (error) => {
        // Handle error
        this.toastService.showToast('Error updating product.', 'error');
      }
    );
  }
}
