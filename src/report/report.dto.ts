import { Exclude } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { reportType } from './data-access/mock.types';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsInt()
  @IsPositive()
  amount: number;
}

export class UpdateReportDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  amount: number;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  type: reportType;

  @Exclude()
  created_at?: Date;
  updated_at?: Date;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
