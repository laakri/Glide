export interface Report {
  id: number;
  description: string;
  status: ReportStatus;
  createdAt: Date;
  userId: string;
  orderId: number;
}

export interface ReportRequest {
  description: string;
  userId: string;
  orderId: number;
}

export enum ReportStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
  Resolved = 'Resolved',
}
