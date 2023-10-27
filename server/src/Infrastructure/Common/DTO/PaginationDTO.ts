import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @Min(1)
  @Max(10000)
  @Type(() => Number)
  public page?: number = null;
}
