import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPayrollElementsControllerDTO {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  public year: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  public month: number;
}
