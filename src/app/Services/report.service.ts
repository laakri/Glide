import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportStatus } from '../Models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:5152/api/reports';

  constructor(private http: HttpClient) {}

  createReport(reportRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, reportRequest);
  }

  getReports(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getReportById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateReportStatus(id: number, status: ReportStatus): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { status });
  }
}
