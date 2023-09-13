import { Injectable, NotFoundException } from '@nestjs/common';
import { reportType } from 'src/store/mock.types';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}
  getSummary() {
    if (
      !this.reportService.getReport(reportType.EXPENSE).length ||
      !this.reportService.getReport(reportType.INCOME).length
    ) {
      return new NotFoundException();
    }

    const totalExpenses: number = this.getTotalNumberHandler(
      reportType.EXPENSE,
    );

    const totalIncome: number = this.getTotalNumberHandler(reportType.INCOME);

    return {
      totalExpenses,
      totalIncome,
      netProfit: totalIncome - totalExpenses,
    };
  }

  getExpenses(): { totalExpenses: number } | NotFoundException {
    if (!this.reportService.getReport(reportType.EXPENSE).length) {
      return new NotFoundException();
    }
    return { totalExpenses: this.getTotalNumberHandler(reportType.EXPENSE) };
  }

  getIncome(): { totalIncome: number } | NotFoundException {
    if (!this.reportService.getReport(reportType.INCOME).length) {
      return new NotFoundException();
    }
    return { totalIncome: this.getTotalNumberHandler(reportType.INCOME) };
  }

  getTotalNumberHandler = (type: reportType) =>
    this.reportService
      .getReport(type)
      .map((reports) => reports.amount)
      .reduce((prev, cur) => prev + cur, 0);
}
