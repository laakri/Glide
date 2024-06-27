import { ToastService } from './../../../Services/toast.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../Services/report.service';
import { ReportStatus } from '../../../Models/report.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './report-list.component.html',
})
export class ReportListComponent implements OnInit {
  reports: any[] = [];
  ReportStatus = ReportStatus;

  constructor(
    private reportService: ReportService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getReports().subscribe(
      (response: any) => {
        if (response && response.$values) {
          this.reports = response.$values;
          console.log(this.reports);
        }
      },
      (error) => {
        console.error('Error fetching reports', error);
      }
    );
  }

  updateStatus(report: any, newStatus: any): void {
    this.reportService.updateReportStatus(report.id, newStatus).subscribe(
      () => {
        report.status = newStatus;
        this.toastService.showToast(' Report updated', 'success');
      },
      (error) => {
        this.toastService.showToast(' Error updating report status', 'error');

        console.error('Error updating report status', error);
      }
    );
  }

  canChangeStatus(
    currentStatus: ReportStatus,
    newStatus: ReportStatus
  ): boolean {
    const statusOrder = [
      ReportStatus.Pending,
      ReportStatus.Reviewed,
      ReportStatus.Resolved,
    ];
    return (
      statusOrder.indexOf(newStatus) === statusOrder.indexOf(currentStatus) + 1
    );
  }

  getStatusClass(status: any): {
    text: string;
    color: string;
  } {
    switch (status) {
      case 0:
        return { text: 'Pending ', color: 'btn-warning' };
      case 1:
        return { text: 'Reviewed', color: 'btn-info' };
      case 2:
        return { text: 'Resolved', color: 'btn-success' };

      default:
        return { text: 'Unknown', color: '' };
    }
  }
}
