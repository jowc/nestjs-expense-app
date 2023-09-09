import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { data } from './data-access/mock.data';
import { reportInterface } from './data-access/mock.types';

const findReport = (type: string, id: string): reportInterface =>
  data.reports
    .filter((report) => report.type == type)
    .find((report) => report.id === id);

@Injectable()
export class ReportService {
  getReport(type: string): reportInterface[] {
    return data.reports.filter((report) => report.type == type);
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
    req: reportInterface,
  ): reportInterface | string {
    if (!findReport(type, id)) return `No report matching the id: ${id}`;
    const updatedReport = { ...findReport(type, id), ...req };
    const getReportIndex = data.reports
      .filter((report) => report.type == type)
      .findIndex((report) => report.id === id);
    data.reports[getReportIndex] = updatedReport;
    return updatedReport;
  }

  deleteReport(type: string, id: string): string {
    if (!findReport(type, id)) return `No report matching the id: ${id}`;
    const removeReport = data.reports.filter(
      (report) => report.id != findReport(type, id).id,
    );
    console.log(removeReport);
    // data.reports = removeReport;
    return `Deleted report ${+id}`;
  }
}
