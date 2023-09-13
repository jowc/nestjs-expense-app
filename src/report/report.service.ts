import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { data } from './data-access/mock.data';
import { reportInterface } from './data-access/mock.types';
import { ReportResponseDto, UpdateReportDto } from './report.dto';

const findReport = (type: string, id: string): ReportResponseDto => {
  const report = data.reports
    .filter((report) => report.type == type)
    .find((report) => report.id === id);
  return new ReportResponseDto(report);
};

const listReport = (type: string): ReportResponseDto[] =>
  data.reports
    .filter((report) => report.type == type)
    .map((report) => new ReportResponseDto(report));

@Injectable()
export class ReportService {
  getReport(type: string): ReportResponseDto[] {
    return listReport(type);
  }

  getReportId(type: string, id: string): ReportResponseDto | string {
    if (!findReport(type, id)) return `No report matching the id: ${id}`;
    return findReport(type, id);
  }

  createReport(req: reportInterface): ReportResponseDto {
    const report: reportInterface = {
      id: uuid(),
      ...req,
      created_at: new Date(),
      updated_at: new Date(),
    };
    data.reports.unshift(report);
    return new ReportResponseDto(report);
  }

  updateReport(
    type: string,
    id: string,
    req: UpdateReportDto,
  ): ReportResponseDto | string {
    if (!findReport(type, id)) return `No report matching the id: ${id}`;
    const updatedReport = { ...findReport(type, id), ...req };
    const getReportIndex = data.reports.findIndex((report) => report.id === id);
    data.reports.splice(getReportIndex, 1, updatedReport);
    return new ReportResponseDto(updatedReport);
  }

  deleteReport(type: string, id: string): string {
    if (!findReport(type, id)) return `No report matching the id: ${id}`;
    const removeReport = data.reports.filter(
      (report) => report.id != findReport(type, id).id,
    );
    data.reports = removeReport;
    return `Deleted report ${+id}`;
  }
}
