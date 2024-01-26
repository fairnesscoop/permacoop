import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @Min(1)
  @Max(10000)
  @IsNumber()
  public page = 1;
}
