import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBooleanString } from 'class-validator';

export class FiltersDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  public withAccountant;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  public activeOnly;
}
