import { ToastService } from './../../Services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Auth/AuthServices/auth.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  productId!: number;
  product!: Product;
  ratingValue: number = 5;
  submittedRatingValue: number = 1;
  ratingDescription: string = '';
  reviewSummary: { score: number; count: number }[] = [];
  averageRating: number = 0;
  totalReviews: number = 0;
  userData!: any;
  editingRating: any = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
      this.getProduct();
    });
  }

  getProduct(): void {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.calculateReviewSummary();
      },
      (error) => {
        console.error(error);
      }
    );
    this.userData = this.authService.getUserData();
  }

  calculateReviewSummary(): void {
    const ratingCounts: { [key: number]: number } = {};
    this.totalReviews = this.product.ratings.$values.length;

    this.product.ratings.$values.forEach((rating: any) => {
      ratingCounts[rating.score] = (ratingCounts[rating.score] || 0) + 1;
    });

    this.reviewSummary = [1, 2, 3, 4, 5].map((score) => ({
      score,
      count: ratingCounts[score] || 0,
    }));

    const totalScore = this.product.ratings.$values.reduce(
      (sum: any, rating: any) => sum + rating.score,
      0
    );
    this.averageRating = totalScore / this.totalReviews;
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getStockClass(): string {
    if (!this.product || this.product.stock === undefined) {
      return '';
    } else if (this.product.stock <= 0) {
      return 'badge-error';
    } else if (this.product.stock <= 10) {
      return 'badge-warning';
    } else {
      return 'badge-success';
    }
  }

  rateProduct() {
    const rating: any = {
      Score: this.submittedRatingValue,
      Comment: this.ratingDescription,
    };

    if (this.editingRating) {
      // Edit existing rating
      this.productService
        .editRating(this.productId, this.editingRating.id, rating)
        .subscribe(
          (response) => {
            this.toastService.showToast(
              'Rating updated successfully',
              'success'
            );
            this.getProduct();
            this.resetRatingForm();
          },
          (error) => {
            this.toastService.showToast('Error updating rating', 'error');
          }
        );
    } else {
      // Add new rating
      this.productService.rateProduct(this.productId, rating).subscribe(
        (response) => {
          this.toastService.showToast(
            'Rating submitted successfully',
            'success'
          );
          this.getProduct();
          this.resetRatingForm();
        },
        (error) => {
          this.toastService.showToast('Error submitting rating', 'error');
        }
      );
    }
  }

  range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }
  editRating(comment: any) {
    this.editingRating = { ...comment };
    this.submittedRatingValue = comment.score;
    this.ratingDescription = comment.comment;

    // Open the modal for editing
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  deleteRating(comment: any) {
    if (confirm('Are you sure you want to delete this rating?')) {
      this.productService.deleteRating(this.productId, comment.id).subscribe(
        () => {
          this.toastService.showToast('Rating deleted successfully', 'success');
          this.getProduct(); // Refresh the product data
        },
        (error) => {
          this.toastService.showToast('Error deleting rating', 'error');
        }
      );
    }
  }
  resetRatingForm() {
    this.editingRating = null;
    this.submittedRatingValue = 5;
    this.ratingDescription = '';
  }
}
