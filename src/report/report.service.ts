import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  getReport() {
    return 'All reports';
  }

  getReportId(id: string) {
    return `Report for ${+id}`;
  }

  createReport() {
    return `Report created`;
  }

  updateReport(id: string) {
    return `Updated report ${+id}`;
  }

  deleteReport(id: string) {
    return `Deleted report ${+id}`;
  }
}
