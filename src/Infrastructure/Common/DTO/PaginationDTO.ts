import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @Min(1)
  @Max(10000)
  @IsNumber()
  @Transform((_, { page }) => +page)
  public page = 1;
}
