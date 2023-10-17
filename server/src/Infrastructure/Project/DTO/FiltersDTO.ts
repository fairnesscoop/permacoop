import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsOptional, Min, Max } from 'class-validator';

export class FiltersDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @Min(1)
  @Max(10000)
  @Type(() => Number)
  public page?: number = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  public customerId?: string;
}
