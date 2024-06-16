import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ReportService } from '../../Services/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './report-create.component.html',
})
export class ReportCreateComponent {
  constructor(private reportService: ReportService) {}

  onSubmit(addReportForm: NgForm) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(addReportForm.value)) {
      formData.append(key, value as string);
    }
    formData.append('userId', '3424242');
    formData.append('orderId', '3424242');

    this.reportService.createReport(formData).subscribe(
      (response) => {
        console.log('Report created successfully:', response);
        // Handle successful report creation (e.g., display a success message)
      },
      (error) => {
        console.error('Error creating report:', error);
        // Handle error (e.g., display an error message)
      }
    );
  }
}
