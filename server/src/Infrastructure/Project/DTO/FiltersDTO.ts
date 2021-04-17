import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';

export class FiltersDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  public customerId?: string;
}
