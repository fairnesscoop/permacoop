import { IsNumber, IsOptional } from 'class-validator';

export class GetPayrollElementsControllerDTO {
  @IsNumber()
  @IsOptional()
  public month: number;

  @IsNumber()
  @IsOptional()
  public year: number;
}
