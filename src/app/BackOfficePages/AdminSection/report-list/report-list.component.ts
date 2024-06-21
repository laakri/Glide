import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../Services/report.service';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [],
  templateUrl: './report-list.component.html',
})
export class ReportListComponent implements OnInit {
  reports!: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
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
}
