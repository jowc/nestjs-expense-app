import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { reportType } from 'src/store/mock.types';

@Controller('v1/summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}
  @Get()
  getSummary() {
    return this.summaryService.getSummary();
  }
  @Get(':type')
  getMonies(
    @Param('type', new ParseEnumPipe(reportType))
    type: reportType,
  ) {
    return type === reportType.INCOME
      ? this.summaryService.getIncome()
      : this.summaryService.getExpenses();
  }
}
