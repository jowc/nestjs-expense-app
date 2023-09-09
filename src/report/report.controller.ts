import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { reportInterface, reportType } from './data-access/mock.types';

const reqType = (type: string): reportType =>
  type === 'income' ? reportType.INCOME : reportType.EXPENSE;

@Controller('v1/report/:type')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  getReport(@Param('type') type: string): reportInterface[] {
    return this.reportService.getReport(reqType(type));
  }

  @Get(':id')
  getReportId(
    @Param() { type, id }: { type: string; id: string },
  ): reportInterface | string {
    return this.reportService.getReportId(type, id);
  }

  @Post()
  createReport(@Param('type') type: string, @Body() body: reportInterface) {
    const req: reportInterface = { ...body, type: reqType(type) };
    return this.reportService.createReport(req);
  }

  @Patch(':id')
  updateReport(
    @Param() { type, id }: { type: string; id: string },
    @Body() body: reportInterface,
  ) {
    return this.reportService.updateReport(type, id, body);
  }

  @Delete(':id')
  deleteReport(@Param() { type, id }: { type: string; id: string }) {
    return this.reportService.deleteReport(type, id);
  }
}
