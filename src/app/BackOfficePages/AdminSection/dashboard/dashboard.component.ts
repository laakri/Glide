import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { DashboardService } from '../../../Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboardStats: any = {};

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDashboardStats();
  }

  getDashboardStats() {
    this.dashboardService.getDashboardStats().subscribe(
      (data) => {
        this.dashboardStats = data;
        this.createOrderStatusChart();
        this.createTopProductsChart();
        this.createProductsByCategoryChart();
        this.createMonthlySalesChart();
      },
      (error) => {
        console.error('Error fetching dashboard stats:', error);
      }
    );
  }
  createOrderStatusChart() {
    const ctx = document.getElementById(
      'orderStatusChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.dashboardStats.ordersByStatus.$values.map((item: any) =>
          this.getStatusLabel(item.status)
        ),
        datasets: [
          {
            data: this.dashboardStats.ordersByStatus.$values.map(
              (item: any) => item.count
            ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          title: {
            display: true,
            text: 'Orders by Status',
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  }

  createTopProductsChart() {
    const ctx = document.getElementById(
      'topProductsChart'
    ) as HTMLCanvasElement;
    const gradient = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.8)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.dashboardStats.topProducts.$values.map(
          (product: any) => product.name
        ),
        datasets: [
          {
            label: 'Units Sold',
            data: this.dashboardStats.topProducts.$values.map(
              (product: any) => product.totalSold
            ),
            backgroundColor: gradient,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Top Selling Products',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart',
        },
      },
    });
  }

  createProductsByCategoryChart() {
    const ctx = document.getElementById(
      'productsByCategoryChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.dashboardStats.productsByCategory.$values.map(
          (item: any) => item.category
        ),
        datasets: [
          {
            data: this.dashboardStats.productsByCategory.$values.map(
              (item: any) => item.count
            ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
            ],
            hoverBackgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Products by Category',
          },
          legend: {
            position: 'right',
          },
        },
        cutout: '60%',
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  }

  createMonthlySalesChart() {
    const ctx = document.getElementById(
      'monthlySalesChart'
    ) as HTMLCanvasElement;
    const gradient = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.1)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dashboardStats.monthlySales.$values.map((item: any) =>
          new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })
        ),
        datasets: [
          {
            label: 'Monthly Sales',
            data: this.dashboardStats.monthlySales.$values.map(
              (item: any) => item.total
            ),
            fill: true,
            backgroundColor: gradient,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.4,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Sales',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart',
        },
      },
    });
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Processing';
      case 2:
        return 'ReadyForPickup';
      case 3:
        return 'Delivered';
      case 4:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
}
