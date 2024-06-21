import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportRequest, ReportStatus } from '../Models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:5152/api/reports';

  constructor(private http: HttpClient) {}

  createReport(reportRequest: any): Observable<Report> {
    return this.http.post<any>(`${this.apiUrl}`, reportRequest);
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${id}`);
  }

  updateReportStatus(id: number, status: ReportStatus): Observable<Report> {
    return this.http.put<Report>(`${this.apiUrl}/${id}/status`, { status });
  }
}
