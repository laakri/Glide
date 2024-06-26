import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product.model';
import { ProductService } from '../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './marketplace.component.html',
})
export class MarketplaceComponent implements OnInit {
  filter = true;
  products: any;
  filteredProducts: any;
  categories: any[] = [];
  priceRanges: any[] = [
    { label: '$0 - $100', min: 0, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $300', min: 200, max: 300 },
    { label: '$300+', min: 300, max: null },
  ];
  ratings: string[] = [
    '1 Star & Up',
    '2 Stars & Up',
    '3 Stars & Up',
    '4 Stars & Up',
  ];
  selectedCategories: number[] = [];
  selectedPriceRanges: any[] = [];
  selectedRatings: string[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  totalItems: number = 0;
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.updateBreadcrumbs();
  }
  updateBreadcrumbs(): void {
    this.breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Shop', url: '/marketplace' },
    ];

    if (this.selectedCategories.length === 1) {
      const selectedCategory = this.categories.find((cat) =>
        cat.subCategories.$values.some(
          (sub: { id: number }) => sub.id === this.selectedCategories[0]
        )
      );
      if (selectedCategory) {
        const subCategory = selectedCategory.subCategories.$values.find(
          (sub: any) => sub.id === this.selectedCategories[0]
        );
        this.breadcrumbs.push({
          label: selectedCategory.name,
          url: `/marketplace?category=${selectedCategory.id}`,
        });
        if (subCategory) {
          this.breadcrumbs.push({
            label: subCategory.name,
            url: `/marketplace?category=${subCategory.id}`,
          });
        }
      }
    }
  }
  filterSwitch() {
    this.filter = !this.filter;
  }
  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response && response.$values) {
        this.categories = response.$values;
      } else {
        this.categories = response;
      }
      this.loading = false;
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe((response: any) => {
      if (response && response.$values) {
        this.products = response.$values;
      } else {
        this.products = response;
      }
      this.applyFiltersAndSearch();
      this.loading = false;
    });
  }

  applyFiltersAndSearch(): void {
    this.loading = true;
    let searchParams = new URLSearchParams();
    if (this.searchTerm) {
      searchParams.append('nameOrDescription', this.searchTerm);
    }
    if (this.selectedCategories.length > 0) {
      this.selectedCategories.forEach((category) => {
        searchParams.append('categories', category.toString());
      });
    }
    if (this.selectedPriceRanges.length > 0) {
      let minPrice = Math.min(
        ...this.selectedPriceRanges.map((range) => range.min)
      );
      let maxPrice = Math.max(
        ...this.selectedPriceRanges.map((range) => range.max || Infinity)
      );
      searchParams.append('minPrice', minPrice.toString());
      if (maxPrice !== Infinity) {
        searchParams.append('maxPrice', maxPrice.toString());
      }
    }
    searchParams.append('page', this.currentPage.toString());
    searchParams.append('pageSize', this.itemsPerPage.toString());

    this.productService.searchProducts(searchParams.toString()).subscribe({
      next: (response: any) => {
        if (response && response.items.$values) {
          this.filteredProducts = response.items.$values;
          console.log(this.filteredProducts);
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
        } else {
          console.error('Unexpected response format:', response);
          this.filteredProducts = [];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.filteredProducts = [];
        this.loading = false;
      },
    });
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFiltersAndSearch();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFiltersAndSearch();
    }
  }
  onCategoryChange(categoryId: number): void {
    if (this.selectedCategories.includes(categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== categoryId
      );
    } else {
      this.selectedCategories = [categoryId];
    }

    const queryParams =
      this.selectedCategories.length > 0
        ? { category: this.selectedCategories[0] }
        : {};
    this.router.navigate([], {
      relativeTo: this.router.routerState.root,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });

    this.applyFiltersAndSearch();
    this.updateBreadcrumbs();
  }

  onPriceRangeChange(priceRange: any): void {
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
  resetFilters(): void {
    this.selectedCategories = [];
    this.selectedPriceRanges = [];
    this.selectedRatings = [];
    this.searchTerm = '';
    this.applyFiltersAndSearch();
  }

  onSearchTermChange(): void {
    this.applyFiltersAndSearch();
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product.product);
  }
}
