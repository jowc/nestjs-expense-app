import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('v1/report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('income')
  getReport(): string {
    return this.reportService.getReport();
  }

  @Get('income/:id')
  getReportId(@Param('id') id: string): string {
    return this.reportService.getReportId(id);
  }

  @Post('income')
  createReport() {
    return this.reportService.createReport();
  }

  @Patch('income/:id')
  updateReport(@Param('id') id: string) {
    return this.reportService.updateReport(id);
  }

  @Delete('income/:id')
  deleteReport(@Param('id') id: string) {
    return this.reportService.deleteReport(id);
  }
}
