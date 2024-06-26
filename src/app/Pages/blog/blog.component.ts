import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  featured: boolean;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  featuredPosts: BlogPost[] = [];
  recentPosts: BlogPost[] = [];
  categories: string[] = [];
  email: string = '';

  ngOnInit() {
    this.loadFeaturedPosts();
    this.loadRecentPosts();
    this.loadCategories();
  }

  loadFeaturedPosts() {
    // Simulated API call
    this.featuredPosts = [
      {
        id: 1,
        title: 'Top 10 Summer Fashion Trends',
        excerpt:
          'Discover the hottest styles for the upcoming summer season...',
        author: 'Emma Style',
        date: '2024-06-15',
        category: 'Fashion',
        imageUrl: 'https://i.gyazo.com/f05b8e6ea831fa0ca16f554ccc001a34.png',
        featured: true,
      },
      {
        id: 2,
        title: 'The Future of E-commerce: AI and Personalization',
        excerpt:
          'Learn how artificial intelligence is revolutionizing online shopping...',
        author: 'Alex Tech',
        date: '2024-06-10',
        category: 'Technology',
        imageUrl: 'https://i.gyazo.com/98e6037891cfb3aa75e65224c5f7d9c5.png',
        featured: true,
      },
    ];
  }

  loadRecentPosts() {
    // Simulated API call
    this.recentPosts = [
      {
        id: 3,
        title: 'Sustainable Fashion: Eco-Friendly Brands to Watch',
        excerpt:
          'Explore these innovative brands that are making a difference...',
        author: 'Olivia Green',
        date: '2024-06-05',
        category: 'Sustainability',
        imageUrl: 'https://i.gyazo.com/c22e0ab3c0dfe7386845313026aae565.png',
        featured: false,
      },
      {
        id: 4,
        title: 'DIY Home Decor Ideas for Summer',
        excerpt:
          'Transform your living space with these easy and affordable DIY projects...',
        author: 'Sophie Crafts',
        date: '2024-06-01',
        category: 'Home & Living',
        imageUrl: 'https://i.gyazo.com/56f4dfb5be2e6256d7e826d377e4ae2c.png',
        featured: false,
      },
      {
        id: 5,
        title: 'The Rise of Mobile Shopping: Stats and Trends',
        excerpt:
          'Dive into the latest statistics on mobile e-commerce and what it means for retailers...',
        author: 'Mark Analytics',
        date: '2024-05-28',
        category: 'E-commerce',
        imageUrl: 'https://i.gyazo.com/3b9639f0617b510489054cb42eb129f8.png',
        featured: false,
      },
    ];
  }

  loadCategories() {
    // Simulated API call
    this.categories = [
      'Fashion',
      'Technology',
      'Sustainability',
      'Home & Living',
      'E-commerce',
      'Beauty',
      'Lifestyle',
    ];
  }

  subscribeNewsletter() {
    // Implement newsletter subscription logic here
    console.log(`Subscribing email: ${this.email}`);
    // Reset email field after submission
    this.email = '';
  }
}
