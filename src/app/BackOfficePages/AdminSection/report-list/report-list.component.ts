import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../Services/report.service';
import { ReportStatus } from '../../../Models/report.model';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-list.component.html',
})
export class ReportListComponent implements OnInit {
  reports: any[] = [];
  ReportStatus = ReportStatus; // Make enum available in template

  constructor(private reportService: ReportService) {}

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

  updateStatus(reportId: number, newStatus: ReportStatus): void {
    this.reportService.updateReportStatus(reportId, newStatus).subscribe(
      () => {
        // Update the local report status
        const report = this.reports.find((r) => r.id === reportId);
        if (report) {
          report.status = newStatus;
        }
      },
      (error) => {
        console.error('Error updating report status', error);
      }
    );
  }
}
