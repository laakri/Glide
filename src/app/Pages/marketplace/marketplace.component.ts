import { Component } from '@angular/core';
import { Product } from '../../Models/product.model';
import { ProductService } from '../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css',
})
export class MarketplaceComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [
    'Electronics',
    'Fashion',
    'Home Goods',
    'Sports & Outdoors',
  ];
  priceRanges: any[] = ['$0 - $100', '$100 - $200', '$200 - $300', '$300+'];
  ratings: string[] = [
    '1 Star & Up',
    '2 Stars & Up',
    '3 Stars & Up',
    '4 Stars & Up',
  ];
  selectedCategories: string[] = [];
  selectedPriceRanges: string[] = [];
  selectedRatings: string[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((response: any) => {
      if (response && response.$values) {
        this.products = response.$values;
      } else {
        this.products = response;
      }
      this.applyFiltersAndSearch();
    });
  }

  applyFiltersAndSearch(): void {
    this.filteredProducts = this.products.filter((product) => {
      const passesCategoryFilter =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category);
      // const passesPriceFilter =
      //   this.selectedPriceRanges.length === 0 ||
      //   this.selectedPriceRanges.includes(product.priceRange);
      // const passesRatingFilter =
      //   this.selectedRatings.length === 0 ||
      //   this.selectedRatings.includes(product.rating);
      const passesSearchFilter =
        this.searchTerm.trim() === '' ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      return (
        passesCategoryFilter &&
        // passesPriceFilter &&
        // passesRatingFilter &&
        passesSearchFilter
      );
    });
  }

  onCategoryChange(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFiltersAndSearch();
  }

  onPriceRangeChange(priceRange: string): void {
    if (this.selectedPriceRanges.includes(priceRange)) {
      this.selectedPriceRanges = this.selectedPriceRanges.filter(
        (p) => p !== priceRange
      );
    } else {
      this.selectedPriceRanges.push(priceRange);
    }
    this.applyFiltersAndSearch();
  }

  onRatingChange(rating: string): void {
    if (this.selectedRatings.includes(rating)) {
      this.selectedRatings = this.selectedRatings.filter((r) => r !== rating);
    } else {
      this.selectedRatings.push(rating);
    }
    this.applyFiltersAndSearch();
  }

  onSearchTermChange(): void {
    this.applyFiltersAndSearch();
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
