import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty()
  @Min(1)
  @Max(10000)
  @Type(() => Number)
  public page: number = 1;
}
