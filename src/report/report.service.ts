import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { data } from './data-access/mock.data';
import { reportInterface } from './data-access/mock.types';
import { UpdateReportDto } from './report.dto';

const findReport = (type: string, id: string): reportInterface =>
  data.reports
    .filter((report) => report.type == type)
    .find((report) => report.id === id);

const listReport = (type: string): reportInterface[] =>
  data.reports.filter((report) => report.type == type);

@Injectable()
export class ReportService {
  getReport(type: string): reportInterface[] {
    return listReport(type);
  }

  getReportId(type: string, id: string): reportInterface | string {
    if (!findReport(type, id)) return `No report matching the id: ${id}`;
    return findReport(type, id);
  }

  createReport(req: reportInterface) {
    const report: reportInterface = {
      id: uuid(),
      ...req,
      created_at: new Date(),
      updated_at: new Date(),
    };
    data.reports.unshift(report);
    return report;
  }

  updateReport(
    type: string,
    id: string,
    req: UpdateReportDto,
  ): reportInterface | string {
    if (!findReport(type, id)) return `No report matching the id: ${id}`;
    const updatedReport = { ...findReport(type, id), ...req };
    const getReportIndex = data.reports.findIndex((report) => report.id === id);
    data.reports.splice(getReportIndex, 1, updatedReport);
    return updatedReport;
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
