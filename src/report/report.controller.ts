import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { reportInterface, reportType } from './data-access/mock.types';
import { CreateReportDto, UpdateReportDto } from './report.dto';

const reqType = (type: string): reportType =>
  type === 'income' ? reportType.INCOME : reportType.EXPENSE;

@Controller('v1/report/:type')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  getReport(
    @Param('type', new ParseEnumPipe(reportType))
    type: string,
  ): reportInterface[] {
    return this.reportService.getReport(reqType(type));
  }

  @Get(':id')
  getReportId(
    @Param('type', new ParseEnumPipe(reportType))
    type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): reportInterface | string {
    return this.reportService.getReportId(type, id);
  }

  @Post()
  createReport(@Param('type') type: string, @Body() body: CreateReportDto) {
    const req: reportInterface = { ...body, type: reqType(type) };
    return this.reportService.createReport(req);
  }

  @Patch(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(reportType))
    type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ) {
    return this.reportService.updateReport(type, id, body);
  }

  @Delete(':id')
  deleteReport(
    @Param('type', new ParseEnumPipe(reportType))
    type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reportService.deleteReport(type, id);
  }
}
