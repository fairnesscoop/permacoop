import { IsNumber, IsOptional } from 'class-validator';

export class GetPayrollElementsControllerDTO {
  @IsNumber()
  @IsOptional()
  public year: number;

  @IsNumber()
  @IsOptional()
  public month: number;
}
