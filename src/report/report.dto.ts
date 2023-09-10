import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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
