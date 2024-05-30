import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(10000)
  @IsNumber()
  public page = 1;
}
